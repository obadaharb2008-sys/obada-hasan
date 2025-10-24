import os
import logging
import requests
from pathlib import Path
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

CHATBASE_API_URL = "https://www.chatbase.co/api/v1/chat"
CHATBASE_CHATBOT_ID = os.environ.get('CHATBASE_CHATBOT_ID', 'gWvWe8QFeq_IVVm0vDONf')

class AdvancedAIService:
    """
    Advanced AI Service using Chatbase
    """
    
    def __init__(self):
        self.conversation_history = []
        self.max_history = 10
    
    def chat(self, user_message: str, language: str = "en") -> dict:
        """
        Chat with Chatbase chatbot
        """
        try:
            payload = {
                "chatbotId": CHATBASE_CHATBOT_ID,
                "messages": [
                    {"content": user_message, "role": "user"}
                ]
            }
            
            response = requests.post(
                CHATBASE_API_URL,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                logger.error(f"Chatbase API error: {response.status_code}")
                return {
                    "success": False,
                    "error": "Service temporarily unavailable",
                    "message": "Unable to process your request. Please try again."
                }
            
            data = response.json()
            assistant_message = data.get('text', 'No response generated')
            
            self.conversation_history.append({"role": "user", "content": user_message})
            self.conversation_history.append({"role": "assistant", "content": assistant_message})
            
            return {
                "success": True,
                "message": assistant_message,
                "language": language
            }
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Request error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "message": "Connection error. Please try again."
            }
        except Exception as e:
            logger.error(f"Chat error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "message": "An error occurred. Please try again."
            }
    
    def analyze_image(self, image_data: str, question: str = None, language: str = "en") -> dict:
        """
        Analyze image using Chatbase
        """
        try:
            prompt = question or "Please analyze this image."
            
            payload = {
                "chatbotId": CHATBASE_CHATBOT_ID,
                "messages": [
                    {"content": prompt, "role": "user"}
                ]
            }
            
            response = requests.post(
                CHATBASE_API_URL,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                return {
                    "success": False,
                    "error": "Service error",
                    "analysis": "Unable to analyze image"
                }
            
            data = response.json()
            analysis = data.get('text', 'No analysis generated')
            
            return {
                "success": True,
                "analysis": analysis,
                "language": language
            }
            
        except Exception as e:
            logger.error(f"Image analysis error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "analysis": "Error processing image"
            }
    
    def text_to_speech(self, text: str, language: str = "en") -> bytes:
        """
        TTS not available with Chatbase
        """
        logger.warning("Text-to-speech not available")
        return None
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []
        return {"success": True, "message": "Conversation history cleared"}


ai_service = AdvancedAIService()
