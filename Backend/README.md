# ExoML Backend - Railway Deployment Guide

## 🚀 Quick Deploy to Railway

### Prerequisites
- Railway account: https://railway.app
- GitHub repository connected to Railway

### Deployment Steps

1. **Connect to Railway**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select this repository
   - Set root directory to `Backend`

2. **Configure Environment Variables** (Optional)
   ```
   FLASK_ENV=production
   PORT=5000  (Railway sets this automatically)
   ```

3. **Deploy**
   - Railway will automatically detect Python and use the Procfile
   - Build time: ~2-3 minutes
   - Your app will be live at: `https://your-app.railway.app`

## 📝 Local Development

### Setup
```bash
cd Backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### Run
```bash
python app.py
```

Server will start at: `http://localhost:5000`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | Detailed health status |
| GET | `/api/model-features/<model>` | Get top 3 features for a model |
| GET | `/api/list-notebooks` | List available Jupyter notebooks |
| POST | `/api/run-notebook` | Execute a notebook |
| POST | `/api/predict` | Make exoplanet prediction |
| GET | `/api/predictions` | Get prediction history |

## 📊 Models Available

- **Kepler**: Kepler mission exoplanet detection
- **K2**: K2 mission (Kepler extended)
- **TESS**: TESS mission
- **Light_Curve**: Generic light curve analysis

## 🗄️ Database

SQLite database (`db.sqlite3`) stores prediction history:
- Dataset used
- Model used
- Input features
- Prediction probability
- Classification label
- Timestamp

## 🛠️ Tech Stack

- **Flask**: Web framework
- **Gunicorn**: Production WSGI server
- **NumPy**: Numerical computing
- **SQLite**: Database
- **Jupyter**: Notebook execution support

## 📦 Project Structure

```
Backend/
├── app.py                 # Main Flask application
├── models.py             # ML model logic and feature definitions
├── utils.py              # Database utilities
├── requirements.txt      # Python dependencies
├── Procfile             # Railway start command
├── runtime.txt          # Python version
├── railway.json         # Railway configuration
├── Notebooks/           # Jupyter notebooks
│   ├── Kepler_Exoplanet_Modeling_FlaskReady.ipynb
│   ├── K2_Exoplanet_Modeling_FlaskReady.ipynb
│   ├── TESS_Exoplanet_Modeling_FlaskReady.ipynb
│   └── Data Sources/    # CSV datasets
└── static/              # Static assets (models, plots, results)
```

## 🔧 Troubleshooting

### Port Issues
Railway automatically sets the PORT environment variable. The app reads it via:
```python
port = int(os.environ.get('PORT', 5000))
```

### Database Issues
Database is created automatically on first run. If issues occur:
1. Delete `db.sqlite3`
2. Restart the app
3. Database will reinitialize

### CORS Issues
CORS is enabled for all origins. For production, update in `app.py`:
```python
CORS(app, origins=["https://your-frontend-domain.com"])
```

## 📞 Support

For issues or questions, contact the development team.

---
**Built with ❤️ for Exoplanet Discovery**
