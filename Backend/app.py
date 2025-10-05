from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from models import load_model, get_top_features, make_prediction, get_metrics
from utils import get_connection

app = Flask(__name__)
CORS(app)

# =============== ROUTES ===============

@app.route("/api/datasets", methods=["GET"])
def list_datasets():
    datasets = ["Kepler", "K2", "TESS", "Light_Curve"]
    return jsonify({"datasets": datasets})

@app.route("/api/models", methods=["GET"])
def list_models():
    models = ["RandomForest", "XGBoost", "LogisticRegression"]
    return jsonify({"models": models})

@app.route("/api/features", methods=["POST"])
def get_features():
    data = request.json
    dataset_name = data.get("dataset")
    model_name = data.get("model")

    model, X_test, y_test = load_model(dataset_name, model_name)
    features = get_top_features(model, X_test)

    return jsonify({"top_features": features})

@app.route("/api/metrics", methods=["POST"])
def model_metrics():
    data = request.json
    dataset_name = data.get("dataset")
    model_name = data.get("model")

    model, X_test, y_test = load_model(dataset_name, model_name)
    metrics = get_metrics(model, X_test, y_test)

    return jsonify(metrics)

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json
    dataset_name = data.get("dataset")
    model_name = data.get("model")
    inputs = data.get("values")

    model, X_test, y_test = load_model(dataset_name, model_name)
    prediction = make_prediction(model, inputs)

    return jsonify({"prediction": int(prediction)})

@app.route("/api/log", methods=["POST"])
def log_prediction():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO logs (dataset, model, input_values, prediction) VALUES (?, ?, ?, ?)",
        (data["dataset"], data["model"], str(data["values"]), data["prediction"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Logged successfully"})

if __name__ == "__main__":
    app.run(debug=True)
