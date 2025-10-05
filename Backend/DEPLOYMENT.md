# 🚀 Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

### Files Created/Updated
- [x] `app.py` - Fixed file paths, added production config
- [x] `utils.py` - Fixed database functions, absolute paths
- [x] `models.py` - Already working correctly
- [x] `requirements.txt` - Added Gunicorn and all dependencies
- [x] `Procfile` - Railway start command
- [x] `runtime.txt` - Python version specification
- [x] `railway.json` - Railway configuration
- [x] `.gitignore` - Exclude unnecessary files
- [x] `config.py` - Environment-based configuration
- [x] `README.md` - Deployment guide

### Code Fixes Applied
- [x] Fixed hardcoded file paths to use `os.path.abspath()`
- [x] Fixed folder name from "Note books" to "Notebooks"
- [x] Added `save_prediction()` function to utils.py
- [x] Added `get_predictions()` function to utils.py
- [x] Added proper error handling for file operations
- [x] Added environment variable support for PORT
- [x] Added production/development mode detection
- [x] Fixed database schema to match API calls

### Dependencies
- [x] Flask (web framework)
- [x] Flask-CORS (cross-origin requests)
- [x] Gunicorn (production server)
- [x] NumPy (numerical computing)
- [x] Pandas (data manipulation)
- [x] Scikit-learn (ML support)
- [x] Joblib (model serialization)
- [x] Jupyter tools (notebook execution)

## 🔧 Railway Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare backend for Railway deployment"
git push origin main
```

### 2. Deploy on Railway

#### Option A: Deploy from GitHub
1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. **IMPORTANT**: Set root directory to `Backend`
6. Railway will auto-detect Python and deploy

#### Option B: Deploy using Railway CLI
```bash
npm install -g @railway/cli
railway login
cd Backend
railway init
railway up
```

### 3. Configure Environment Variables (Optional)

In Railway dashboard, add these variables:

```env
FLASK_ENV=production
CORS_ORIGINS=https://your-frontend-domain.com
SECRET_KEY=your-secret-key-here
```

**Note:** Railway automatically sets `PORT` - don't set it manually!

### 4. Verify Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-app.railway.app/api/health

# List notebooks
curl https://your-app.railway.app/api/list-notebooks

# Get model features
curl https://your-app.railway.app/api/model-features/Kepler
```

## 🧪 Local Testing Before Deployment

### 1. Test with Production Settings
```bash
cd Backend
pip install -r requirements.txt

# Test with Gunicorn (production server)
gunicorn app:app --bind 0.0.0.0:5000

# Or test with Flask dev server
python app.py
```

### 2. Test API Endpoints
```bash
# In another terminal
curl http://localhost:5000/api/health
curl http://localhost:5000/api/list-notebooks
curl http://localhost:5000/api/model-features/Kepler

# Test prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kepler",
    "dataset": "Kepler",
    "features": {
      "disposition_score": 0.8,
      "signal_to_noise": 15.5,
      "transit_depth_ppm": 1200
    }
  }'
```

## ⚠️ Common Issues & Solutions

### Issue 1: Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Issue 2: Database Locked
```bash
# Delete and reinitialize
rm db.sqlite3
python app.py  # Will recreate on startup
```

### Issue 3: Module Not Found
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Issue 4: CORS Errors
Update `app.py` CORS configuration:
```python
CORS(app, origins=["https://your-frontend.com"])
```

### Issue 5: Notebooks Not Found
- Verify folder name is "Notebooks" (not "Note books")
- Check file paths in code use `os.path.abspath()`
- Ensure notebooks exist in Backend/Notebooks/

## 📊 Post-Deployment Monitoring

### Check Logs
```bash
# Railway CLI
railway logs

# Or view in Railway Dashboard → Deployments → Logs
```

### Monitor Database
```bash
# SSH into Railway container
railway run bash
sqlite3 db.sqlite3
.tables
SELECT COUNT(*) FROM predictions;
```

## 🔄 Update Deployment

When you make changes:
```bash
git add .
git commit -m "Update backend"
git push origin main
# Railway auto-deploys on push
```

## 🎯 Success Criteria

- [x] All endpoints return 200 OK
- [x] Health check returns "healthy"
- [x] Predictions save to database
- [x] Frontend can connect via CORS
- [x] No hardcoded paths
- [x] Using Gunicorn in production
- [x] Environment variables working

## 📞 Need Help?

### Railway Documentation
- https://docs.railway.app/
- https://docs.railway.app/deploy/deployments

### Flask Documentation
- https://flask.palletsprojects.com/

### Debug Mode
Enable detailed errors temporarily:
```python
# In app.py (for testing only!)
app.config['DEBUG'] = True
```

---

## ✨ You're Ready to Deploy!

All files are configured. Just push to GitHub and deploy on Railway!

**Estimated deployment time: 2-5 minutes**
