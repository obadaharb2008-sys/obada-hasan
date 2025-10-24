# 🚀 Deployment Checklist for Render

## Before Deployment
- [ ] Git repository is up to date
- [ ] All changes committed
- [ ] No uncommitted changes (run `git status`)

## Required Information to Gather
- [ ] MongoDB Atlas connection string (MONGO_URL)
  - Create at: https://www.mongodb.com/cloud/atlas
  - Format: `mongodb+srv://username:password@cluster0.mongodb.net`

## GitHub Setup
- [ ] Repository is public or Render has access
- [ ] Main branch is up to date
- [ ] All files committed: `git push origin main`

## Render Dashboard Setup
- [ ] Create Render account at https://dashboard.render.com
- [ ] Connect GitHub account
- [ ] Create Blueprint from `render.yaml` OR manually create services

## Environment Variables (in Render Dashboard)

### Backend Service `obada-portfolio-backend`
- [ ] `PYTHONUNBUFFERED` = `1`
- [ ] `ENVIRONMENT` = `production`
- [ ] `CORS_ORIGINS` = `*`
- [ ] `MONGO_URL` = `your-mongodb-url`
- [ ] `DB_NAME` = `portfolio_db`
- [ ] `CHATBASE_CHATBOT_ID` = `gWvWe8QFeq_IVVm0vDONf`

### Frontend Service `obada-portfolio-frontend`
- [ ] `NODE_ENV` = `production`
- [ ] `REACT_APP_API_URL` = Auto-linked from backend

## After Deployment

### Test Endpoints
- [ ] Backend health: `https://your-backend.onrender.com/api/health`
  - Should return: `{"status": "healthy", "database": "connected"}`
- [ ] Chat endpoint working
- [ ] Frontend loads without errors
- [ ] Image analysis endpoint accessible

### Monitor
- [ ] Check Render logs for errors
- [ ] Test all features (chat, image analysis, status)
- [ ] Verify database connections

## Troubleshooting Commands

### Check backend logs
```
Render Dashboard → Backend Service → Logs
```

### Check frontend logs
```
Render Dashboard → Frontend Service → Logs
```

### Manual health check
```bash
curl https://your-backend-url/api/health
```

### Test chat endpoint
```bash
curl -X POST https://your-backend-url/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hi", "language": "en"}'
```

## Success Indicators
✅ Backend service is running (check status on dashboard)
✅ Frontend service is running (check status on dashboard)
✅ Health check endpoint returns healthy
✅ No errors in deployment logs
✅ Can access frontend URL in browser
✅ Chat works with Chatbase
✅ Database is connected

## Important Notes
- 🟢 First deployment may take 5-10 minutes
- 📝 Keep MongoDB Atlas cluster active (free tier auto-pauses after 60 days)
- 🔄 Deployments auto-trigger on `git push` to main
- 📊 Monitor usage on Render dashboard
- 🛡️ Render provides free tier with limited resources

---

**Status**: ✅ Project is fully prepared for deployment!
