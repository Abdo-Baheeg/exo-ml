# 🚀 Railway Deployment - Quick Start Guide

This is a simplified guide to get your ExoML backend deployed to Railway in minutes!

---

## 📌 Prerequisites

✅ GitHub account with your code pushed  
✅ Railway account (sign up at https://railway.app)  
✅ All changes committed and pushed to GitHub

---

## 🎯 Deployment Steps (5 Minutes)

### Step 1: Verify Everything is Pushed

```bash
cd "C:\Users\bobah\Desktop\new final exoml\exo-ml"
git status
git push origin main
```

Expected: "Your branch is up to date with 'origin/main'"

### Step 2: Create Railway Project

1. Go to **https://railway.app**
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Choose **`Abdo-Baheeg/exo-ml`** repository

### Step 3: Configure Root Directory

Since your backend is in the `Backend` folder:

1. In Railway, go to **Settings** → **Deploy**
2. Set **Root Directory** to: `Backend`
3. Click **Save Changes**

### Step 4: Set Environment Variables (Optional)

In Railway Settings → Variables, add:

| Variable | Value |
|----------|-------|
| `FLASK_ENV` | `production` |
| `CORS_ORIGINS` | `*` (or your frontend URL) |

> **Note**: Railway automatically sets `PORT` for you!

### Step 5: Deploy!

Railway will automatically:
- ✅ Detect Python from `requirements.txt`
- ✅ Run build command from `railway.json`
- ✅ Install all dependencies
- ✅ Set up Jupyter kernel
- ✅ Start your app with gunicorn

**Wait 2-5 minutes** for the first deployment.

---

## ✅ Verify Deployment

### Get Your URL

In Railway dashboard, you'll see:
```
https://exo-ml-production.up.railway.app
```

### Test Endpoints

**Health Check:**
```bash
curl https://your-app.railway.app/api/health
```

**List Notebooks:**
```bash
curl https://your-app.railway.app/api/list-notebooks
```

**Test Prediction:**
```bash
curl -X POST https://your-app.railway.app/api/predict \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"Kepler\",\"features\":{\"koi_fpflag_nt\":0,\"koi_fpflag_ss\":0,\"koi_fpflag_co\":0}}"
```

---

## 🎨 Update Frontend to Use Railway Backend

Edit `FrontEnd/.env`:

```bash
VITE_API_BASE_URL=https://your-app.railway.app/api
```

Or the app will auto-detect it in production!

---

## 🔄 Auto-Deployment

Every time you push to GitHub, Railway automatically redeploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Railway automatically deploys! 🚀
```

---

## 📊 Monitor Your App

Railway Dashboard shows:
- 📈 **Metrics**: CPU, Memory, Network usage
- 📝 **Logs**: Real-time application logs
- 🔄 **Deployments**: History of all deployments
- ⚙️ **Settings**: Environment variables, domains

---

## ⚠️ Common Issues & Fixes

### 1. Build Fails
**Check**: Railway logs → Build tab  
**Fix**: Verify `requirements.txt` has all dependencies

### 2. App Crashes on Start
**Check**: Railway logs → Deploy tab  
**Fix**: Ensure `railway.json` start command is correct

### 3. Notebook Execution Fails
**Check**: Logs show "kernel not found"  
**Fix**: Verify build command includes kernel setup (already configured!)

### 4. Out of Memory
**Solution**: Upgrade Railway plan or reduce workers to 1

---

## 🎯 Current Configuration

Your backend is configured with:

```json
{
  "build": {
    "buildCommand": "pip install --upgrade pip && pip install -r requirements.txt && python -m ipykernel install --user --name=python3"
  },
  "deploy": {
    "startCommand": "gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 300",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**All dependencies included:**
- ✅ Flask, Gunicorn (Web server)
- ✅ Jupyter, nbconvert, ipykernel (Notebooks)
- ✅ scikit-learn, xgboost (ML models)
- ✅ matplotlib, seaborn (Visualizations)
- ✅ pandas, numpy (Data processing)

---

## 📱 Railway CLI (Optional)

For advanced users, install Railway CLI:

```bash
npm i -g @railway/cli
railway login
railway link
railway up  # Deploy directly
railway logs  # View logs
```

---

## 🔗 Useful Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Your GitHub Repo**: https://github.com/Abdo-Baheeg/exo-ml
- **Full Deployment Guide**: See `Backend/RAILWAY_DEPLOYMENT.md`

---

## 🎉 Success Checklist

After deployment, verify:

- [x] Railway shows "Active" status
- [x] `/api/health` returns 200 OK
- [x] `/api/list-notebooks` shows 3 notebooks
- [x] `/api/predict` endpoint works
- [x] Frontend can connect to backend
- [x] Logs show no errors

---

## 🆘 Need Help?

1. **Check Railway Logs**: Most issues show up in logs
2. **Review Full Guide**: `Backend/RAILWAY_DEPLOYMENT.md`
3. **Railway Support**: https://discord.gg/railway
4. **Check GitHub Issues**: https://github.com/Abdo-Baheeg/exo-ml/issues

---

**Your backend is production-ready!** 🚀

Railway will handle:
- ✅ Automatic SSL certificates
- ✅ Auto-scaling
- ✅ Health monitoring
- ✅ Crash recovery
- ✅ Continuous deployment

Just push to GitHub and Railway does the rest!
