# 🌌 ExoML - AI-Powered Exoplanet Detection Platform

<div align="center">

![ExoML Banner](https://img.shields.io/badge/ExoML-Exoplanet%20Detection-00d4ff?style=for-the-badge)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.2-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**An AI-powered web platform for detecting exoplanets using machine learning on Kepler, K2, TESS, and light curve data.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage-guide) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

ExoML is a comprehensive web application designed to help cosmology scientists and researchers automate the detection of exoplanets using state-of-the-art machine learning techniques. The platform provides an intuitive interface for running Jupyter notebooks, making predictions, and visualizing results from multiple space telescope datasets.

### 🎯 Key Objectives

- **Save Time**: Automate the exoplanet detection workflow
- **Accuracy**: Utilize trained ML models on Kepler, K2, and TESS datasets
- **Accessibility**: User-friendly web interface for researchers
- **Visualization**: Interactive dashboards and timeline of exoplanet exploration
- **Education**: Learning resources for students and researchers

---

## 🚀 Features

### 🔬 Core Functionality

- **📊 Multiple Dataset Support**
  - Kepler mission data
  - K2 mission data
  - TESS (Transiting Exoplanet Survey Satellite) data
  - Light curve analysis

- **🤖 Machine Learning Models**
  - Pre-trained CNN models for exoplanet detection
  - Support for custom model architectures
  - Real-time prediction capabilities
  - Model performance comparison

- **📓 Jupyter Notebook Integration**
  - Run Jupyter notebooks directly from the web interface
  - Execute analysis pipelines (Kepler, K2, TESS, Light Curve)
  - View execution results and outputs

- **📈 Interactive Dashboard**
  - Probability distribution histograms
  - Label distribution pie charts
  - Model usage statistics (bar charts)
  - Recent predictions table with timestamps
  - Powered by Plotly.js for interactive visualizations

- **📊 Data Input & Prediction**
  - CSV or JSON format input
  - Real-time prediction results
  - Probability scores and confidence levels
  - Detailed prediction history

- **🕰️ Timeline Feature**
  - Historical milestones in exoplanet discovery
  - From 1992 (first confirmed exoplanets) to JWST era
  - Interactive timeline with hover details

- **📚 Learning Resources**
  - Educational articles and explainers
  - Video resources (embeddable)
  - Links to NASA archives and official missions

### 🎨 User Interface

- **Modern Design**: Dark theme with gradient accents (cyan to blue)
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Navigation**: Sticky navbar with anchor links
- **Interactive Components**: Hover effects and transitions
- **TailwindCSS**: Utility-first CSS framework for rapid development

### 🔧 Technical Features

- **RESTful API**: Flask backend with CORS support
- **SQLite Database**: Persistent storage for predictions
- **Real-time Updates**: Hot module replacement in development
- **Proxy Configuration**: Vite proxy for seamless API communication
- **Error Handling**: Comprehensive error messages and validation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.13+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** and npm ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/downloads))

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/zeyadahmedh/Exoplanets-Detection-Using-Machine-Learning.git
cd Exoplanets-Detection-Using-Machine-Learning
```

### 2️⃣ Backend Setup (Python/Flask)

#### Create Virtual Environment

**Windows (PowerShell):**

```powershell
# Navigate to the project root
cd Backend

# Create virtual environment
python -m venv ../.venv

# Activate virtual environment
../.venv/Scripts/Activate.ps1

# If you get an execution policy error, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**macOS/Linux:**

```bash
# Navigate to the project root
cd Backend

# Create virtual environment
python3 -m venv ../.venv

# Activate virtual environment
source ../.venv/bin/activate
```

#### Install Python Dependencies

```bash
# Make sure you're in the Backend directory with venv activated
pip install --upgrade pip
pip install -r requirements.txt
```

**Dependencies installed:**

- Flask ≥3.0.0 - Web framework
- Flask-CORS ≥4.0.0 - Cross-Origin Resource Sharing
- nbconvert ≥7.10.0 - Jupyter notebook conversion
- nbformat ≥5.9.2 - Jupyter notebook format
- jupyter-client ≥8.6.0 - Jupyter kernel client
- pandas ≥2.2.0 - Data manipulation
- scikit-learn ≥1.4.0 - Machine learning
- numpy ≥1.26.0 - Numerical computing

### 3️⃣ Frontend Setup (React/Vite)

```bash
# Navigate to frontend directory
cd ../FrontEnd

# Install Node.js dependencies
npm install
```

**Dependencies installed:**

- React 18.2.0 - UI framework
- React DOM 18.2.0 - React rendering
- React Plotly.js - Interactive charts
- Vite 4.4.5 - Build tool and dev server
- TailwindCSS 3.3.0 - CSS framework
- Autoprefixer & PostCSS - CSS processing

---

## 🚀 Running the Application

You need to run **both** the backend and frontend servers simultaneously.

### Option 1: Run in Separate Terminals (Recommended)

#### Terminal 1 - Backend Server

```bash
# Navigate to Backend directory
cd Backend

# Activate virtual environment (if not already activated)
# Windows:
../.venv/Scripts/Activate.ps1
# macOS/Linux:
source ../.venv/bin/activate

# Run Flask server
python app.py
```

The backend will start at: **<http://localhost:5000>**

You should see:

```
✅ Database initialized successfully
🚀 Starting ExoML Backend Server...
📊 API available at: http://localhost:5000
🔗 Endpoints:
   GET  /api/health
   GET  /api/list-notebooks
   POST /api/run-notebook
   POST /api/predict
   GET  /api/predictions
```

#### Terminal 2 - Frontend Server

```bash
# Navigate to Frontend directory
cd FrontEnd

# Run development server
npm run dev
```

The frontend will start at: **<http://localhost:5173>**

You should see:

```
  VITE v5.4.20  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://[your-ip]:5173/
```

### Option 2: Background Processes

**Windows PowerShell:**

```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend; ../.venv/Scripts/python.exe app.py"

# Start frontend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd FrontEnd; npm run dev"
```

### ✅ Verify Everything is Running

1. **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
2. **Backend Health Check**: Visit [http://localhost:5000/api/health](http://localhost:5000/api/health)
3. You should see the ExoML landing page with no proxy errors

---

## � Usage Guide

### 🏠 Home Page

When you first load the application, you'll see:

- **Hero Section**: Welcome message and call-to-action buttons
- **Navigation Bar**: Links to Datasets, Predict, Timeline, Dashboard, and Learn sections
- Smooth scroll navigation to different sections

### � Dataset Selection

1. Navigate to the **Datasets** section
2. Choose from available datasets:
   - Kepler Mission
   - K2 Mission
   - TESS Mission
   - Light Curve Analysis
3. Click on a dataset card to select it

### 🔮 Making Predictions

1. Scroll to the **Predict** section
2. Enter your data in one of two formats:

   **CSV Format:**

   ```
   0.1,0.2,0.3,0.4,0.5
   ```

   **JSON Format:**

   ```json
   [0.1, 0.2, 0.3, 0.4, 0.5]
   ```

3. Click the **Predict** button
4. View results:
   - Probability score (0.0 to 1.0)
   - Classification label (Exoplanet / Not Exoplanet)
   - Raw model output details

### 📓 Running Notebooks

1. Navigate to the **Run Jupyter Notebooks** section
2. Select a notebook from the dropdown:
   - `Kepler_notebook.ipynb`
   - `K2.ipynb`
   - `Tess_Notebook.ipynb`
   - `Light_curve_notebook.ipynb`
3. Click **Run [notebook name]**
4. Wait for execution (may take several minutes)
5. View the execution output in JSON format

### 📈 Dashboard & Analytics

The **Insights Dashboard** displays:

1. **Probability Distribution**: Histogram showing distribution of prediction probabilities
2. **Label Distribution**: Pie chart showing exoplanet vs non-exoplanet ratio
3. **Model Usage**: Bar chart of predictions by model type
4. **Recent Predictions**: Table of the 12 most recent predictions with:
   - Timestamp
   - Notebook used
   - Model name
   - Probability score
   - Classification label

### 🕰️ Timeline

Explore the **History of Exoplanet Exploration**:

- 1992: First confirmed exoplanets
- 2009: Kepler Launch
- 2013: K2 Mission
- 2018: TESS Launch
- 2021: JWST Science Era

### 📚 Learning Resources

Access educational materials:

- Articles about transit method and missions
- Video tutorials (YouTube embeddable)
- Links to NASA archives and official mission sites

---

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "healthy",
  "database": "connected"
}
```

#### 2. List Notebooks

```http
GET /api/list-notebooks
```

**Response:**

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

#### 3. Run Notebook

```http
POST /api/run-notebook
Content-Type: application/json

{
  "notebook": "Kepler_notebook.ipynb",
  "parameters": {}
}
```

**Response:**

```json
{
  "success": true,
  "stdout": "...",
  "stderr": "",
  "returncode": 0
}
```

#### 4. Make Prediction

```http
POST /api/predict
Content-Type: application/json

{
  "model": "CNN",
  "input": [0.1, 0.2, 0.3, 0.4, 0.5],
  "notebook": "manual"
}
```

**Response:**

```json
{
  "probability": 0.65,
  "label": "Exoplanet",
  "raw": {
    "model_used": "CNN",
    "input_features": [0.1, 0.2, 0.3, 0.4, 0.5],
    "confidence": 0.65,
    "feature_count": 5
  },
  "model": "CNN",
  "success": true
}
```

#### 5. Get Predictions History

```http
GET /api/predictions
```

**Response:**

```json
{
  "predictions": [
    {
      "id": 1,
      "timestamp": "2025-10-04T10:30:00",
      "notebook": "manual",
      "model": "CNN",
      "input_data": [0.1, 0.2, 0.3],
      "probability": 0.65,
      "label": "Exoplanet"
    }
  ],
  "count": 1
}
```

---

## 📁 Project Structure

```
Exoplanets-Detection-Using-Machine-Learning/
├── Backend/
│   ├── app.py                 # Flask application
│   ├── models.py              # ML model functions
│   ├── utils.py               # Database utilities
│   ├── requirements.txt       # Python dependencies
│   ├── db.sqlite3            # SQLite database
│   └── Note books/           # Jupyter notebooks
│       ├── Kepler_notebook.ipynb
│       ├── K2.ipynb
│       ├── Tess_Notebook.ipynb
│       └── Light_curve_notebook.ipynb
├── FrontEnd/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DataInput.jsx
│   │   │   ├── DatasetSelector.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Learn.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotebookRun.jsx
│   │   │   └── Timeline.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   ├── api.js            # API functions
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   └── postcss.config.js     # PostCSS configuration
├── Data Sources/             # CSV datasets
│   ├── Kepler.csv
│   ├── k2.csv
│   └── TESS.csv
└── README.md                 # This file
```

---

## � Troubleshooting

### Backend Issues

**Problem: Import errors for Flask**

```bash
# Solution: Make sure virtual environment is activated
../.venv/Scripts/Activate.ps1  # Windows
source ../.venv/bin/activate   # macOS/Linux

# Then reinstall dependencies
pip install -r requirements.txt
```

**Problem: Database errors**

```bash
# Solution: Delete and reinitialize database
rm db.sqlite3
python app.py  # Will auto-create new database
```

**Problem: Notebook not found**

```bash
# Solution: Check notebook path in Backend/Note books/
# Ensure notebook names match exactly (case-sensitive)
```

### Frontend Issues

**Problem: Proxy errors to /api/***

```bash
# Solution: Make sure backend is running on port 5000
# Check vite.config.js proxy settings
```

**Problem: npm install fails**

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Problem: Port 5173 already in use**

```bash
# Solution: Kill the process or use a different port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

### Python Version Issues

**Problem: Pandas installation fails with Python 3.13**

```bash
# Already fixed in requirements.txt with pandas>=2.2.0
# If you still have issues, ensure you have the latest pip:
python -m pip install --upgrade pip
```

---

## 🔄 Development Workflow

### Making Changes

1. **Backend Changes**: Flask auto-reloads in debug mode
2. **Frontend Changes**: Vite provides Hot Module Replacement (HMR)
3. **Database Schema Changes**: Delete `db.sqlite3` and restart backend

### Adding New Notebooks

1. Place `.ipynb` file in `Backend/Note books/`
2. Add filename to `NOTEBOOK_OPTIONS` in:
   - `FrontEnd/src/components/NotebookRun.jsx`
   - `FrontEnd/src/components/DatasetSelector.jsx`

### Building for Production

```bash
# Frontend build
cd FrontEnd
npm run build

# Output will be in FrontEnd/dist/
# Deploy with any static hosting service
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 👥 Authors

- **Zeyad Ahmed** - [zeyadahmedh](https://github.com/zeyadahmedh)
- **Abdulrahman Ghazy** - [abdo-ghg](https://github.com/abdo-ghg)
- **Omar Marey** - [OMarey1](https://github.com/OMarey1)
- **Abdulrahman Bahig**
- **Abdulrahman Adel**
- **Ali Mahmoud**

---

## 🙏 Acknowledgments

- **NASA** for Kepler, K2, and TESS mission data
- **Exoplanet Archive** for datasets and resources
- **Open Source Community** for amazing libraries and tools

---

## 📞 Support

For questions or issues:

- Open an issue on [GitHub](https://github.com/zeyadahmedh/Exoplanets-Detection-Using-Machine-Learning/issues)
- Check the [Troubleshooting](#-troubleshooting) section

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ for the astronomy and data science community**

[⬆ Back to Top](#-exoml---ai-powered-exoplanet-detection-platform)

</div>
