import sqlite3
import os
import json
from datetime import datetime

# Use absolute path for database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "db.sqlite3")

def get_connection():
    """Create a connection to the SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with the predictions table"""
    conn = get_connection()
    cursor = conn.cursor()
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
    print("✅ Database initialized successfully")

def save_prediction(dataset, model, features, probability, label, raw_output):
    """Save a prediction to the database"""
    try:
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
            json.dumps(raw_output) if raw_output else None
        ))
        
        conn.commit()
        conn.close()
        print(f"✅ Prediction saved: {model} | Label: {label} | Prob: {probability:.2f}")
    except Exception as e:
        print(f"❌ Error saving prediction: {e}")

def get_predictions(limit=50):
    """Retrieve recent predictions from the database"""
    try:
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
                "features": json.loads(row["features"]) if row["features"] else {},
                "probability": row["probability"],
                "label": row["label"],
                "raw_output": json.loads(row["raw_output"]) if row["raw_output"] else None,
                "created_at": row["created_at"]
            })
        
        return predictions
    except Exception as e:
        print(f"❌ Error retrieving predictions: {e}")
        return []
