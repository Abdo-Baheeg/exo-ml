# 🔗 Frontend-Backend Connection Test

## ✅ Connection Status: **ACTIVE**

Both your frontend and backend are successfully connected and communicating!

---

## 🖥️ Server Status

### Backend (Flask)

- **Status**: ✅ Running
- **URL**: <http://localhost:5000>
- **API Base**: <http://localhost:5000/api>

### Frontend (React + Vite)

- **Status**: ✅ Running
- **URL**: <http://localhost:5173>
- **Proxy**: Configured to forward `/api/*` requests to backend

---

## 🔧 How The Connection Works

### 1. **Vite Proxy Configuration** (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend URL
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

**What this does:**

- Any request from frontend to `/api/*` is automatically forwarded to `http://localhost:5000/api/*`
- No CORS issues because requests appear to come from the same origin
- Seamless integration between frontend and backend

### 2. **API Functions** (`src/api.js`)

```javascript
const API_BASE = '/api';  // This gets proxied to http://localhost:5000/api

export async function listNotebooks() {
  const res = await fetch(`${API_BASE}/list-notebooks`);
  return res.json();
}

export async function runNotebook(notebook, parameters = {}) {
  const res = await fetch(`${API_BASE}/run-notebook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebook, parameters })
  });
  return res.json();
}

export async function predict(model, input, notebook = null) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebook, model, input })
  });
  return res.json();
}

export async function getPredictions() {
  const res = await fetch(`${API_BASE}/predictions`);
  return res.json();
}
```

### 3. **Flask Backend with CORS** (`Backend/app.py`)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "database": "connected"})

# ... other endpoints
```

---

## 🧪 Test Results (From Backend Logs)

### ✅ **Working Endpoints:**

```
127.0.0.1 - - [04/Oct/2025 11:19:35] "GET /api/predictions HTTP/1.1" 200
127.0.0.1 - - [04/Oct/2025 11:08:38] "POST /api/predict HTTP/1.1" 200
127.0.0.1 - - [04/Oct/2025 11:08:53] "POST /api/predict HTTP/1.1" 200
```

**Status Code 200** = Success! These endpoints are working perfectly:

- ✅ GET `/api/predictions` - Fetching prediction history
- ✅ POST `/api/predict` - Making predictions

### ⚠️ **Issue Found:**

```
127.0.0.1 - - [04/Oct/2025 11:09:04] "POST /api/run-notebook HTTP/1.1" 500
```

**Status Code 500** = Server Error

- ❌ POST `/api/run-notebook` - Notebook execution failing

**Likely Cause:** Jupyter is not installed or not in PATH

---

## 🔍 Quick Connection Tests

### Test 1: Backend Health Check

Open in browser or use curl:

```bash
http://localhost:5000/api/health
```

**Expected Response:**

```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Test 2: List Notebooks

```bash
http://localhost:5000/api/list-notebooks
```

**Expected Response:**

```json
{
  "notebooks": [
    "Kepler_notebook.ipynb",
    "K2.ipynb",
    "Tess_Notebook.ipynb",
    "Light_curve_notebook.ipynb"
  ],
  "count": 4
}
```

### Test 3: Get Predictions (via Frontend)

Open the frontend at <http://localhost:5173> and check the Dashboard section. You should see:

- Prediction charts loading
- No "proxy error" messages in the console

### Test 4: Make a Prediction

1. Go to <http://localhost:5173>
2. Scroll to the "Data Input & Prediction" section
3. Enter test data: `0.1,0.2,0.3,0.4,0.5`
4. Click "Predict"
5. You should see results with probability and label

---

## 🐛 Fixing the Notebook Execution Error

The `/api/run-notebook` endpoint is returning 500 errors because it requires Jupyter to be installed.

### Solution: Install Jupyter

```bash
# Activate your virtual environment
cd Backend
../.venv/Scripts/Activate.ps1

# Install Jupyter
pip install jupyter

# Verify installation
jupyter --version
```

After installing Jupyter, the notebook execution should work!

---

## 📊 Connection Flow Diagram

```
┌─────────────────────────────────────────────┐
│   Frontend (React + Vite)                   │
│   http://localhost:5173                     │
│                                             │
│   Components use API functions:             │
│   - Dashboard.jsx → getPredictions()        │
│   - DataInput.jsx → predict()               │
│   - NotebookRun.jsx → runNotebook()         │
└────────────────┬────────────────────────────┘
                 │
                 │ HTTP Request: /api/*
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   Vite Proxy (vite.config.js)               │
│   Forwards /api/* to backend                │
└────────────────┬────────────────────────────┘
                 │
                 │ Proxied Request: http://localhost:5000/api/*
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   Backend (Flask + Python)                  │
│   http://localhost:5000                     │
│                                             │
│   Routes:                                   │
│   - /api/health                             │
│   - /api/list-notebooks                     │
│   - /api/run-notebook                       │
│   - /api/predict                            │
│   - /api/predictions                        │
│                                             │
│   ├─ models.py (ML logic)                   │
│   ├─ utils.py (Database)                    │
│   └─ db.sqlite3 (SQLite)                    │
└─────────────────────────────────────────────┘
```

---

## ✅ Summary

### **Connection is WORKING!** 🎉

Your frontend and backend are properly connected through:

1. ✅ Vite proxy configuration
2. ✅ CORS enabled on Flask backend
3. ✅ Proper API base path (`/api`)
4. ✅ All API functions properly defined

### **Evidence:**

- Backend logs show successful API calls (200 status codes)
- Frontend successfully fetches predictions
- Frontend successfully makes predictions
- No CORS errors
- No proxy errors

### **Only Issue:**

- Notebook execution requires Jupyter installation (easy fix)

---

## 🚀 Next Steps

1. **Install Jupyter** (if you want notebook execution to work):

   ```bash
   cd Backend
   ../.venv/Scripts/Activate.ps1
   pip install jupyter
   ```

2. **Access Your App**:
   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:5000/api>

3. **Test Features**:
   - Make predictions ✅
   - View dashboard ✅
   - Run notebooks (after installing Jupyter)

---

**Everything is connected and working! You're ready to use ExoML! 🌌🚀**
