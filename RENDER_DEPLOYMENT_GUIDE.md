# Render Deployment Guide

## ✅ Project Status: Ready for Deployment

Your project has been fully configured for deployment on Render.

---

## 📋 What Was Fixed

### 1. **Backend Dependencies** (`app/backend/requirements.txt`)
- ✅ Removed duplicate packages (fastapi, uvicorn)
- ✅ Removed invalid packages (jq, s5cmd, pytokens)
- ✅ Removed OpenAI dependency
- ✅ Kept all essential packages for FastAPI + MongoDB + Chatbase

### 2. **AI Service Integration** (`app/backend/ai_service.py`)
- ✅ Replaced OpenAI with Chatbase API
- ✅ Uses your Chatbase Chatbot ID: `gWvWe8QFeq_IVVm0vDONf`
- ✅ All endpoints work with Chatbase:
  - `/api/chat` - Chat with your bot
  - `/api/analyze-image` - Image analysis
  - `/api/clear-chat` - Clear chat history

### 3. **Configuration Files**
- ✅ Updated `.env.example` with Chatbase variables
- ✅ Updated `render.yaml` with proper deployment settings
- ✅ Added environment variables for production

---

## 🚀 How to Deploy to Render

### Step 1: Prepare Your Git Repository
```bash
# From project root
git add -A
git commit -m "Configure for Render deployment with Chatbase integration"
git push origin main
```

### Step 2: Create Render Services

#### Option A: Using Dashboard (Recommended for beginners)
1. Go to https://dashboard.render.com
2. Create a new "Web Service"
3. Connect your GitHub repository
4. For Backend Service:
   - **Name**: `obada-portfolio-backend`
   - **Runtime**: Python 3.11
   - **Build Command**: `pip install -r app/backend/requirements.txt`
   - **Start Command**: `cd app && uvicorn backend.server:app --host 0.0.0.0 --port $PORT --workers 4`
   - **Environment Variables**:
     ```
     PYTHONUNBUFFERED=1
     ENVIRONMENT=production
     CORS_ORIGINS=*
     MONGO_URL=your-mongodb-connection-string
     DB_NAME=portfolio_db
     CHATBASE_CHATBOT_ID=gWvWe8QFeq_IVVm0vDONf
     ```
   - **Health Check Path**: `/api/health`

5. For Frontend Service:
   - **Name**: `obada-portfolio-frontend`
   - **Runtime**: Node 18
   - **Build Command**: `cd app/frontend && npm install && npm run build`
   - **Start Command**: `cd app/frontend && npm install -g serve && serve -s build -l 3000`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     REACT_APP_API_URL=https://your-backend-url/api
     ```

#### Option B: Using render.yaml (Infrastructure as Code)
1. Ensure `render.yaml` is in your repository root (✅ Already done)
2. Go to https://dashboard.render.com
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Render will automatically read `render.yaml` and create all services

---

## 🔑 Required Environment Variables for Render

### Backend (`obada-portfolio-backend`)
| Variable | Value | Required |
|----------|-------|----------|
| `PYTHONUNBUFFERED` | `1` | Yes |
| `ENVIRONMENT` | `production` | Yes |
| `CORS_ORIGINS` | `*` or your domain | Yes |
| `MONGO_URL` | MongoDB Atlas connection string | Yes |
| `DB_NAME` | `portfolio_db` | Yes |
| `CHATBASE_CHATBOT_ID` | `gWvWe8QFeq_IVVm0vDONf` | Yes |

### Frontend (`obada-portfolio-frontend`)
| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `REACT_APP_API_URL` | Backend service URL (auto-linked) | Yes |

---

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string: `mongodb+srv://username:password@cluster0.mongodb.net`
5. Set this as `MONGO_URL` in Render dashboard

### Option 2: Local MongoDB (Development only)
```bash
# Install MongoDB locally
# Connection string: mongodb://localhost:27017
```

---

## 🧪 Testing Your Deployment

### After Deployment
1. Visit your backend health check:
   ```
   https://your-backend-url/api/health
   ```
   Expected response:
   ```json
   {"status": "healthy", "database": "connected"}
   ```

2. Test the chat endpoint:
   ```bash
   curl -X POST https://your-backend-url/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello", "language": "en"}'
   ```

3. Visit your frontend:
   ```
   https://your-frontend-url
   ```

---

## 📊 Current API Endpoints

### Chat
- **POST** `/api/chat`
  - Body: `{"message": "Your message", "language": "en"}`

### Image Analysis
- **POST** `/api/analyze-image`
  - Form Data: `file` (image), `question` (optional), `language` (optional)

### Status Tracking
- **POST** `/api/status`
  - Body: `{"client_name": "name"}`
- **GET** `/api/status`

### Health Check
- **GET** `/api/health`

### Clear Chat
- **POST** `/api/clear-chat`

---

## 🐛 Troubleshooting

### Backend won't start
Check logs in Render dashboard. Common issues:
- Missing `MONGO_URL` environment variable
- MongoDB connection string is invalid
- Python dependencies not installing

### Frontend can't connect to backend
- Ensure `REACT_APP_API_URL` is set correctly
- Check CORS settings (`CORS_ORIGINS` environment variable)
- Verify backend is running (check health check endpoint)

### Database connection errors
- Verify MongoDB is running (local) or Atlas cluster is active (cloud)
- Check connection string format
- Ensure IP whitelist includes Render servers (for Atlas)

---

## 📝 Next Steps

1. **Set up MongoDB**
   - Create MongoDB Atlas account
   - Get connection string
   - Add to Render environment variables

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Deploy on Render**
   - Use render.yaml (automatic)
   - Or create services manually in dashboard

4. **Monitor Logs**
   - Check Render dashboard logs
   - Fix any errors during build/deployment

5. **Test All Features**
   - Chat functionality
   - Image analysis
   - Status tracking

---

## ✨ Your Chatbase Integration

Your chatbot ID is already configured: `gWvWe8QFeq_IVVm0vDONf`

The backend will automatically route all chat requests to your Chatbase chatbot. No additional configuration needed!

---

## 📞 Support

For Render documentation: https://render.com/docs
For Chatbase documentation: https://www.chatbase.co/docs
