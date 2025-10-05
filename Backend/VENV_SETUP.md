# Virtual Environment Setup Guide

## ✅ Virtual Environment Fixed

Your virtual environment has been recreated successfully with Python 3.13.3.

## Location

- **Path**: `Backend/venv/`
- **Python**: 3.13.3
- **All packages**: Installed ✅

## How to Use

### Activate Virtual Environment

**PowerShell:**

```powershell
cd Backend
.\venv\Scripts\Activate.ps1
```

**Or use the helper script:**

```powershell
cd Backend
.\activate.ps1
```

**Command Prompt:**

```cmd
cd Backend
venv\Scripts\activate.bat
```

### Verify Activation

When activated, you should see `(venv)` before your prompt:

```
(venv) PS C:\Users\omare\...\Backend>
```

### Run the Backend Server

```powershell
python app.py
```

### Deactivate Virtual Environment

```powershell
deactivate
```

## Installed Packages

All required packages from `requirements.txt` are installed:

- ✅ Flask 3.1.2
- ✅ Flask-CORS 6.0.1
- ✅ Gunicorn 23.0.0
- ✅ Pandas 2.3.3
- ✅ Scikit-learn 1.7.2
- ✅ NumPy 2.3.3
- ✅ Jupyter Client 8.6.3
- ✅ And all dependencies...

## Troubleshooting

### Issue: "Activate.ps1 cannot be loaded"

This is a PowerShell execution policy issue.

**Solution:**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Module not found when running app

**Solution:**
Make sure the virtual environment is activated first:

```powershell
.\venv\Scripts\Activate.ps1
python app.py
```

### Issue: Want to reinstall packages

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt --force-reinstall
```

## Quick Start

```powershell
# Navigate to Backend
cd Backend

# Activate venv
.\venv\Scripts\Activate.ps1

# Run the server
python app.py
```

That's it! Your backend should now be running at `http://localhost:5000` 🚀

## Files Created/Modified

- ✅ `Backend/venv/` - Fresh virtual environment
- ✅ `Backend/activate.ps1` - Helper activation script
- ✅ `Backend/VENV_SETUP.md` - This guide

## Old .venv Removed

The old `.venv` directory in the root (created by a different user) has been removed and replaced with a proper `Backend/venv/` directory.
