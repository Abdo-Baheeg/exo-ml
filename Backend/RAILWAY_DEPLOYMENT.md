# Railway Deployment Guide for ExoML Backend

## 📋 Pre-Deployment Checklist

All necessary files are configured for Railway deployment:

- ✅ `requirements.txt` - All dependencies included (updated)
- ✅ `Procfile` - Web process defined
- ✅ `railway.json` - Build and deploy commands configured
- ✅ `runtime.txt` - Python version specified
- ✅ `.gitignore` - Excludes unnecessary files
- ✅ `app.py` - Entry point configured

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Update dependencies for Railway deployment"
git push origin main
```

### Step 2: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `exo-ml` repository
5. Select the `Backend` folder as the root directory

### Step 3: Configure Environment Variables

In Railway dashboard, set these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `5000` | Port for the application (Railway auto-sets this) |
| `FLASK_ENV` | `production` | Sets Flask to production mode |
| `CORS_ORIGINS` | `https://your-frontend-domain.com` | Your frontend URL (comma-separated for multiple) |

**Optional Environment Variables:**
- `DATABASE_URL` - If using external database
- `SECRET_KEY` - For session management (if needed)

### Step 4: Monitor Deployment

Railway will automatically:
1. ✅ Detect Python application
2. ✅ Install dependencies from `requirements.txt`
3. ✅ Set up Jupyter kernel for notebook execution
4. ✅ Start the application using gunicorn

---

## 📦 What Gets Installed

The updated `requirements.txt` includes:

### Core Framework
- Flask 3.0.0+ (Web framework)
- Flask-CORS 4.0.0+ (CORS support)
- Gunicorn 21.2.0+ (Production server)

### Notebook Support
- jupyter 1.0.0+
- nbconvert 7.10.0+
- ipykernel 6.29.0+
- jupyter-client 8.6.0+

### Machine Learning
- scikit-learn 1.4.0+
- pandas 2.2.0+
- numpy 1.26.0+
- xgboost 2.0.0+ ✨ **(Now included)**

### Visualization
- matplotlib 3.8.0+ ✨ **(Now included)**
- seaborn 0.13.0+ ✨ **(Now included)**

### Utilities
- joblib 1.3.2+
- ipython 8.0.0+
- traitlets 5.0.0+

---

## 🔧 Build Configuration

The `railway.json` file specifies:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pip install --upgrade pip && pip install -r requirements.txt && python -m ipykernel install --user --name=python3"
  },
  "deploy": {
    "startCommand": "gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 300",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Key configurations:**
- **Build Command**: Installs dependencies and sets up Jupyter kernel
- **Workers**: 2 (adjust based on Railway plan)
- **Timeout**: 300 seconds (for notebook execution)
- **Auto-restart**: On failure with 10 max retries

---

## 🔍 Jupyter Kernel Setup

The build command automatically sets up the Jupyter kernel:

```bash
python -m ipykernel install --user --name=python3
```

This ensures notebooks can execute in the Railway environment without manual kernel configuration.

---

## 🌐 Testing Deployment

After deployment, test all endpoints:

### Health Check
```bash
curl https://your-app.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

### List Notebooks
```bash
curl https://your-app.railway.app/api/list-notebooks
```

### Test Prediction
```bash
curl -X POST https://your-app.railway.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kepler",
    "dataset": "Kepler",
    "features": {
      "disposition_score": 0.8,
      "signal_to_noise": 50,
      "transit_depth_ppm": 5000
    }
  }'
```

---

## ⚠️ Important Notes

### 1. Notebook Execution Timeout

The default timeout is 300 seconds (5 minutes). If notebooks take longer:

1. Update `app.py` timeout:
   ```python
   result = subprocess.run([...], timeout=600)  # 10 minutes
   ```

2. Update `railway.json` gunicorn timeout:
   ```json
   "startCommand": "gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 600"
   ```

### 2. Memory Considerations

Jupyter notebook execution can be memory-intensive. Ensure your Railway plan has sufficient RAM:
- **Hobby Plan**: 512MB (may struggle with notebooks)
- **Pro Plan**: 8GB+ recommended for smooth operation

### 3. Data Files

Ensure your data files (`k2.csv`, `Kepler.csv`, `TESS.csv`) are in the repository:
```
Backend/
  Notebooks/
    Data Sources/
      k2.csv
      Kepler.csv
      TESS.csv
```

### 4. Static Files

The `static/` directory structure must exist:
```
Backend/
  static/
    models/
    plots/
    results/
```

These directories are created automatically by the application if they don't exist.

---

## 🐛 Troubleshooting

### Build Fails

**Check Railway logs for:**
1. Package installation errors
2. Python version compatibility
3. Missing dependencies

**Solutions:**
- Verify `requirements.txt` syntax
- Check Python version in `runtime.txt`
- Review build logs in Railway dashboard

### Notebook Execution Fails

**Common issues:**
1. **Kernel not found**: Ensure build command includes kernel setup
2. **Missing packages**: Verify all packages in `requirements.txt`
3. **Timeout**: Increase timeout values

**Debug steps:**
1. Check Railway logs
2. Test notebooks locally first
3. Verify data files are deployed

### CORS Errors

**Issue**: Frontend can't access API

**Solution**: Set `CORS_ORIGINS` environment variable:
```
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.netlify.app
```

For development testing:
```
CORS_ORIGINS=*
```

---

## 📊 Monitoring

Railway provides:
- Real-time logs
- Resource usage metrics
- Deployment history
- Error tracking

Access these in the Railway dashboard under your project.

---

## 🔄 Updates & Redeployment

Railway automatically redeploys on push to the main branch:

```bash
# Make changes
git add .
git commit -m "Update feature X"
git push origin main

# Railway automatically triggers new deployment
```

Manual redeploy:
1. Go to Railway dashboard
2. Select your project
3. Click "Deploy" → "Redeploy"

---

## ✅ Deployment Success Indicators

Your deployment is successful when:

1. ✅ Build completes without errors
2. ✅ `/api/health` returns 200 OK
3. ✅ `/api/list-notebooks` shows 3 notebooks
4. ✅ `/api/predict` makes successful predictions
5. ✅ Railway dashboard shows "Active" status
6. ✅ Logs show "Booting worker with pid"

---

## 📝 Post-Deployment

### Update Frontend

Update your frontend API endpoint:

```javascript
// api.js
const API_BASE_URL = 'https://your-app.railway.app';
```

### Test Complete Flow

1. Test health endpoint
2. Test model features
3. Make test predictions
4. Execute a notebook
5. Check prediction history

---

## 🎯 Production Optimization

### 1. Enable Caching
Consider adding Redis for caching predictions.

### 2. Database
Use PostgreSQL instead of SQLite for production:
```python
# Update utils.py to use DATABASE_URL environment variable
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
```

### 3. Logging
Add structured logging:
```python
import logging
logging.basicConfig(level=logging.INFO)
```

### 4. Rate Limiting
Add rate limiting to prevent abuse:
```bash
pip install flask-limiter
```

---

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Flask Docs**: https://flask.palletsprojects.com
- **Gunicorn Docs**: https://docs.gunicorn.org

---

## Summary

✅ **All dependencies included** in `requirements.txt`  
✅ **Jupyter kernel automatically configured** in build command  
✅ **Proper timeout settings** for notebook execution  
✅ **Production-ready** with gunicorn  
✅ **Auto-restart** on failures  
✅ **CORS configured** for frontend integration  

**Your backend is ready for Railway deployment!** 🚀
