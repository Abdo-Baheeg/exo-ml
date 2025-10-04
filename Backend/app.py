from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import json
from utils import init_db, save_prediction, get_predictions
from models import predict_with_model

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

@app.route('/api/list-notebooks', methods=['GET'])
def list_notebooks():
    """إرجاع قائمة النوت بوك المتاحة"""
    try:
        notebooks_dir = os.path.join(os.path.dirname(__file__), 'notebooks')
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
        
        notebook_path = os.path.join(os.path.dirname(__file__), 'notebooks', notebook_name)
        
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
    """إجراء تنبؤ باستخدام النموذج"""
    try:
        data = request.get_json()
        model = data.get('model', 'default')
        input_data = data.get('input', [])
        notebook = data.get('notebook', 'manual')
        
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400
        
        # الحصول على التنبؤ
        probability, label, raw_output = predict_with_model(model, input_data)
        
        # حفظ التنبؤ في قاعدة البيانات
        save_prediction(notebook, model, input_data, probability, label, raw_output)
        
        return jsonify({
            "probability": probability,
            "label": label,
            "raw": raw_output,
            "model": model,
            "success": True
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
    print("   GET  /api/list-notebooks") 
    print("   POST /api/run-notebook")
    print("   POST /api/predict")
    print("   GET  /api/predictions")
    app.run(host='0.0.0.0', port=5000, debug=True)