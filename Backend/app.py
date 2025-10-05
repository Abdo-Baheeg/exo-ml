<<<<<<< Updated upstream
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from models import load_model, get_top_features, make_prediction, get_metrics
from utils import get_connection
=======
import sqlite3
import os
import json
from datetime import datetime
>>>>>>> Stashed changes

# Path to the SQLite database
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "db.sqlite3")

<<<<<<< Updated upstream
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
=======
def get_connection():
    """Create a new connection to the SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize the database if it doesn't exist"""
    conn = get_connection()
    cursor = conn.cursor()

    # Create the predictions table if it doesn’t exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dataset TEXT NOT NULL,
            model TEXT NOT NULL,
            features TEXT NOT NULL,
            probability REAL NOT NULL,
            label TEXT NOT NULL,
            raw_output TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()
    print("📘 Database initialized successfully.")


def save_prediction(dataset, model, features, probability, label, raw_output):
    """Save prediction details into the database"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO predictions (dataset, model, features, probability, label, raw_output)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        dataset,
        model,
        json.dumps(features),
        float(probability),
        label,
        json.dumps(raw_output)
    ))

    conn.commit()
    conn.close()
    print(f"✅ Prediction saved: {model} | Label: {label} | Prob: {probability:.2f}")


def get_predictions(limit=50):
    """Retrieve the most recent predictions"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, dataset, model, features, probability, label, raw_output, created_at
        FROM predictions
        ORDER BY created_at DESC
        LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()
    conn.close()

    # Convert rows to dictionaries
    predictions = []
    for row in rows:
        predictions.append({
            "id": row["id"],
            "dataset": row["dataset"],
            "model": row["model"],
            "features": json.loads(row["features"]),
            "probability": row["probability"],
            "label": row["label"],
            "raw_output": json.loads(row["raw_output"]) if row["raw_output"] else None,
            "created_at": row["created_at"]
        })

    return predictions


def clear_predictions():
    """Optional: clear all prediction history"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM predictions")
    conn.commit()
    conn.close()
    print("🗑️ All predictions cleared.")
>>>>>>> Stashed changes
