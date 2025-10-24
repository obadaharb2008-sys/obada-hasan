from fastapi import FastAPI, APIRouter, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64
from io import BytesIO
from .ai_service import ai_service



# Configure logging FIRST (before any usage)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'portfolio_db')

try:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    # Continue anyway - will fail gracefully when DB is accessed

# Create the main app without a prefix
app = FastAPI(title="Portfolio Backend API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# AI Models
class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    success: bool
    message: str
    language: str
    error: Optional[str] = None

class ImageAnalysisRequest(BaseModel):
    question: Optional[str] = None
    language: str = "en"

class TTSRequest(BaseModel):
    text: str
    language: str = "en"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World", "status": "ok"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint for Render"""
    try:
        # Check if database client exists
        if client is None:
            logger.warning("Database client not initialized")
            return {"status": "healthy", "database": "disconnected"}
        
        # Try to ping the database
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.warning(f"Health check failed: {e}")
        return {"status": "healthy", "database": "disconnected"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    try:
        status_dict = input.model_dump()
        status_obj = StatusCheck(**status_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = status_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        if client is None:
            logger.warning("Database not available, status check not saved")
            return status_obj
        
        _ = await db.status_checks.insert_one(doc)
        return status_obj
    except Exception as e:
        logger.error(f"Error creating status check: {e}")
        raise

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        if client is None:
            logger.warning("Database not available, returning empty status checks")
            return []
        
        # Exclude MongoDB's _id field from the query results
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for check in status_checks:
            if isinstance(check['timestamp'], str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        
        return status_checks
    except Exception as e:
        logger.error(f"Error fetching status checks: {e}")
        return []

# AI Endpoints
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """
    Advanced AI chat endpoint with Jordan IT knowledge
    """
    result = ai_service.chat(request.message, request.language)
    return ChatResponse(**result)

@api_router.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    question: Optional[str] = Form(None),
    language: str = Form("en")
):
    """
    Analyze uploaded image using GPT-4 Vision
    """
    try:
        # Read and encode image
        contents = await file.read()
        base64_image = base64.b64encode(contents).decode('utf-8')
        
        # Analyze with AI
        result = ai_service.analyze_image(base64_image, question, language)
        
        return result
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "analysis": "Error processing image"
        }

@api_router.post("/text-to-speech")
async def text_to_speech(request: TTSRequest):
    """
    Convert text to speech audio
    """
    audio_bytes = ai_service.text_to_speech(request.text, request.language)
    
    if audio_bytes:
        return StreamingResponse(
            BytesIO(audio_bytes),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=speech.mp3"}
        )
    else:
        return {"success": False, "error": "TTS generation failed"}

@api_router.post("/clear-chat")
async def clear_chat_history():
    """
    Clear conversation history
    """
    result = ai_service.clear_history()
    return result

# Include the router in the main app
app.include_router(api_router)

# Configure CORS with environment-based origins
cors_origins = os.environ.get('CORS_ORIGINS', '*')
if cors_origins == '*':
    allow_origins = ["*"]
else:
    allow_origins = [origin.strip() for origin in cors_origins.split(',')]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True if cors_origins != '*' else False,
    allow_origins=allow_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Safely close database client on shutdown"""
    if client is not None:
        client.close()
        logger.info("Database client closed")