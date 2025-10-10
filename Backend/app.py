from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import json
from datetime import datetime
from utils import init_db, save_prediction, get_predictions
from models import predict_with_model, get_model_features
from notebook_parser import parse_notebook_output, parse_timeout_error

app = Flask(__name__)

# CORS Configuration
# Allow all origins in development, restrict in production via environment variable
cors_origins = os.environ.get('CORS_ORIGINS', '*')
if cors_origins == '*':
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type"],
            "supports_credentials": False
        }
    })
else:
    # Production: use specific origins
    origins_list = [origin.strip() for origin in cors_origins.split(',')]
    CORS(app, resources={
        r"/api/*": {
            "origins": origins_list,
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type"],
            "supports_credentials": True
        }
    })

# تهيئة قاعدة البيانات عند البدء
init_db()

@app.route('/')
def home():
    return jsonify({
        "message": "ExoML Backend API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "model_features": "/api/model-features/<model_name>",
            "list_notebooks": "/api/list-notebooks",
            "run_notebook": "/api/run-notebook",
            "predict": "/api/predict",
            "predictions": "/api/predictions"
        }
    })

@app.route('/api')
def api_home():
    """API root endpoint"""
    return jsonify({
        "message": "ExoML Backend API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "model_features": "/api/model-features/<model_name>",
            "list_notebooks": "/api/list-notebooks",
            "run_notebook": "/api/run-notebook",
            "predict": "/api/predict",
            "predictions": "/api/predictions"
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """فحص حالة الخادم"""
    try:
        # Test database connection
        from utils import get_connection
        conn = get_connection()
        conn.close()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return jsonify({
        "status": "healthy",
        "database": db_status,
        "environment": os.environ.get('FLASK_ENV', 'development')
    })

@app.route('/api/model-features/<model_name>', methods=['GET'])
def model_features(model_name):
    """Get the top 3 features for a specific model"""
    try:
        features = get_model_features(model_name)
        return jsonify({
            "model": model_name,
            "features": features["features"],
            "model_type": features["model_type"],
            "success": True
        })
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 404

@app.route('/api/list-notebooks', methods=['GET'])
def list_notebooks():
    """إرجاع قائمة النوت بوك المتاحة"""
    try:
        # Use absolute path and correct folder name (Notebooks, not "Note books")
        notebooks_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Notebooks')

        # Check if directory exists
        if not os.path.exists(notebooks_dir):
            return jsonify({
                "notebooks": [],
                "count": 0,
                "error": "Notebooks directory not found"
            }), 404

        notebooks = [f for f in os.listdir(notebooks_dir) if f.endswith('.ipynb')]
        return jsonify({
            "notebooks": notebooks,
            "count": len(notebooks)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/run-notebook', methods=['POST'])
def run_notebook():
    """Execute a notebook and return user-friendly results"""
    try:
        data = request.get_json()
        notebook_name = data.get('notebook')

        if not notebook_name:
            return jsonify({"error": "No notebook specified", "success": False}), 400

        # Use absolute path and correct folder name
        notebook_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            'Notebooks',
            notebook_name
        )

        if not os.path.exists(notebook_path):
            return jsonify({
                "error": "Notebook not found",
                "message": f"Notebook '{notebook_name}' does not exist",
                "success": False
            }), 404

        # Track execution time
        execution_start = datetime.now()
        
        # Execute notebook using nbconvert
        timeout_seconds = 300
        result = subprocess.run([
            'jupyter', 'nbconvert', '--to', 'notebook', '--execute',
            '--inplace', notebook_path
        ], capture_output=True, text=True, timeout=timeout_seconds)

        # Parse result and return user-friendly output
        parsed_output = parse_notebook_output(notebook_name, result, execution_start)
        
        status_code = 200 if parsed_output["success"] else 500
        return jsonify(parsed_output), status_code

    except subprocess.TimeoutExpired:
        execution_time = (datetime.now() - execution_start).total_seconds()
        timeout_output = parse_timeout_error(notebook_name, execution_time, timeout_seconds)
        return jsonify(timeout_output), 500
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Unexpected error",
            "message": str(e),
            "notebook": notebook_name if 'notebook_name' in locals() else "unknown",
            "troubleshooting": [
                "🔍 Check backend logs for details",
                "🔄 Verify Jupyter is properly installed",
                "📦 Ensure all dependencies are available"
            ]
        }), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """إجراء تنبؤ باستخدام النموذج مع الميزات الأساسية الثلاثة"""
    try:
        data = request.get_json()
        model = data.get('model', 'Kepler')
        features = data.get('features', {})
        dataset = data.get('dataset', 'Kepler')

        # Validate that features are provided
        if not features or len(features) == 0:
            return jsonify({
                "error": "No feature data provided",
                "message": "Please provide values for the top 3 features"
            }), 400

        # Use the model name from dataset if not explicitly provided
        if model == 'default' or not model:
            model = dataset

        # Get prediction using the model-specific features
        probability, label, raw_output = predict_with_model(model, features)

        # Save prediction to database
        save_prediction(dataset, model, features, probability, label, raw_output)

        return jsonify({
            "probability": probability,
            "label": label,
            "raw": raw_output,
            "model": model,
            "dataset": dataset,
            "features_used": features,
            "success": True
        })

    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Prediction failed",
            "success": False
        }), 500

@app.route('/api/predictions', methods=['GET'])
def predictions():
    """إرجاع سجل التنبؤات"""
    try:
        preds = get_predictions()
        return jsonify({
            "predictions": preds,
            "count": len(preds)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting ExoML Backend Server...")
    port = int(os.environ.get('PORT', 5000))
    print(f"📊 API available at: http://localhost:{port}")
    print("🔗 Endpoints:")
    print("   GET  /api/health")
    print("   GET  /api/model-features/<model_name>")
    print("   GET  /api/list-notebooks")
    print("   POST /api/run-notebook")
    print("   POST /api/predict")
    print("   GET  /api/predictions")

    # Use environment variable to determine if in production
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)