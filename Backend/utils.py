import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")

def init_db():
    """تهيئة قاعدة البيانات"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            notebook TEXT,
            model TEXT,
            input_data TEXT,
            probability REAL,
            label TEXT,
            raw_output TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")

def save_prediction(notebook, model, input_data, probability, label, raw_output):
    """حفظ التنبؤ في قاعدة البيانات"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO predictions (timestamp, notebook, model, input_data, probability, label, raw_output)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.utcnow().isoformat(),
        notebook,
        model,
        json.dumps(input_data),
        probability,
        label,
        json.dumps(raw_output)
    ))
    conn.commit()
    conn.close()

def get_predictions(limit=100):
    """جلب سجل التنبؤات"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        SELECT id, timestamp, notebook, model, input_data, probability, label 
        FROM predictions 
        ORDER BY id DESC 
        LIMIT ?
    ''', (limit,))
    rows = c.fetchall()
    conn.close()
    
    predictions = []
    for row in rows:
        predictions.append({
            "id": row[0],
            "timestamp": row[1],
            "notebook": row[2],
            "model": row[3],
            "input_data": json.loads(row[4]),
            "probability": row[5],
            "label": row[6]
        })
    return predictions