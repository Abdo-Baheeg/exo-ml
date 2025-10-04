from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import json
from utils import init_db, save_prediction, get_predictions
from models import predict_with_model, get_model_features

app = Flask(__name__)
CORS(app)

# تهيئة قاعدة البيانات عند البدء
init_db()

@app.route('/')
def home():
    return jsonify({
        "message": "ExoML Backend API",
        "status": "running",
        "version": "1.0.0"
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """فحص حالة الخادم"""
    return jsonify({"status": "healthy", "database": "connected"})

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
        notebooks_dir = os.path.join(os.path.dirname(__file__), 'Note books')
        notebooks = [f for f in os.listdir(notebooks_dir) if f.endswith('.ipynb')]
        return jsonify({
            "notebooks": notebooks,
            "count": len(notebooks)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/run-notebook', methods=['POST'])
def run_notebook():
    """تشغيل نوت بوك معين"""
    try:
        data = request.get_json()
        notebook_name = data.get('notebook')

        if not notebook_name:
            return jsonify({"error": "No notebook specified"}), 400

        notebook_path = os.path.join(os.path.dirname(__file__), 'Note books', notebook_name)

        if not os.path.exists(notebook_path):
            return jsonify({"error": f"Notebook not found: {notebook_name}"}), 404

        # تشغيل النوت بوك باستخدام nbconvert
        result = subprocess.run([
            'jupyter', 'nbconvert', '--to', 'notebook', '--execute',
            '--inplace', notebook_path
        ], capture_output=True, text=True, timeout=300)

        return jsonify({
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        })

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Notebook execution timeout"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
    print("📊 API available at: http://localhost:5000")
    print("🔗 Endpoints:")
    print("   GET  /api/health")
    print("   GET  /api/model-features/<model_name>")
    print("   GET  /api/list-notebooks")
    print("   POST /api/run-notebook")
    print("   POST /api/predict")
    print("   GET  /api/predictions")
    app.run(host='0.0.0.0', port=5000, debug=True)