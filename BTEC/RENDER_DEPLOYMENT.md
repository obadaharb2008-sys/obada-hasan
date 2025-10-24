# Render Deployment Guide

## Prerequisites
- GitHub account with your repository
- Render account (render.com)

## Deployment Steps

### 1. Prepare Your Repository
```bash
git add .
git commit -m "Add SEO and deployment configurations"
git push origin main
```

### 2. Create Render Services

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the branch (usually `main`)
5. Render will automatically detect `render.yaml`
6. Click **"Apply"** to deploy

#### Option B: Manual Setup

**For Frontend:**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `obada-portfolio-frontend`
   - **Runtime:** `Node`
   - **Build Command:** `cd app/frontend && npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Node Version:** 18
4. Add environment variables:
   - `REACT_APP_API_URL=https://your-backend-url/api`
   - `NODE_ENV=production`
5. Click **"Create Web Service"**

**For Backend:**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `obada-portfolio-backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `cd app/backend && pip install -r requirements.txt`
   - **Start Command:** `cd app/backend && python server.py`
   - **Python Version:** 3.11
4. Add environment variables:
   - `PORT=5000`
   - `PYTHONUNBUFFERED=true`
   - `ENVIRONMENT=production`
5. Click **"Create Web Service"**

### 3. Update Frontend API URL
After backend deployment, update your frontend's API URL:
1. Go to frontend service settings
2. Update `REACT_APP_API_URL` with your backend URL
3. Redeploy frontend

### 4. Configure Custom Domain (Optional)
1. Go to service settings
2. Scroll to **"Custom Domains"**
3. Add your domain
4. Update DNS records as instructed by Render

## Environment Variables

### Frontend
```
REACT_APP_API_URL=https://your-backend-url/api
NODE_ENV=production
```

### Backend
```
PORT=5000
PYTHONUNBUFFERED=true
ENVIRONMENT=production
```

## SEO Optimization Checklist

✅ Meta tags configured in `index.html`
✅ `robots.txt` created for search engines
✅ `sitemap.xml` created with all pages
✅ Open Graph tags for social sharing
✅ Twitter Card configuration
✅ Canonical URL set
✅ Performance optimizations included
✅ Security headers configured

## Performance Tips

1. **Enable Auto-Deploy:** Check "Auto-deploy on push" in settings
2. **Set Up Caching:** Configure cache headers in `.htaccess`
3. **Monitor Performance:** Use Render's built-in monitoring
4. **Database:** If needed, add PostgreSQL from Render dashboard
5. **Backups:** Enable automatic backups for databases

## Testing Your Deployment

1. **Check Frontend:** Visit your frontend URL
2. **Test API:** Visit `https://your-backend-url/health`
3. **Test SEO:**
   - Check meta tags in page source
   - Validate with Google Search Console
   - Test sharing on social media
4. **Performance:** Use Google PageSpeed Insights

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (use DNS or HTML file)
4. Submit `sitemap.xml`
5. Monitor indexing status

## Bing Webmaster Tools Setup

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit `sitemap.xml`
4. Monitor indexing

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify Node/Python versions match locally
- Ensure all dependencies are in package.json/requirements.txt

### API Connection Issues
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Check firewall/security rules

### Performance Issues
- Review Render logs for errors
- Check browser console for JavaScript errors
- Use Chrome DevTools Performance tab

## Useful Commands

```bash
# Build locally to test
npm run build

# Run build output locally
npx serve -s build

# Check for build errors
npm run build 2>&1 | tee build-log.txt
```

## Support

- Render Documentation: https://render.com/docs
- React Build Optimization: https://create-react-app.dev/docs/optimizations/
- SEO Best Practices: https://developers.google.com/search/docs

---

**Next Steps:**
1. Push this guide to your repository
2. Deploy using render.yaml
3. Submit sitemap to Google Search Console
4. Monitor performance in Render dashboard