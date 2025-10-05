import sqlite3

<<<<<<< Updated upstream
def get_connection():
    return sqlite3.connect("Backend/db.sqlite3")

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dataset TEXT,
            model TEXT,
            input_values TEXT,
            prediction TEXT
        )
    """)
    conn.commit()
    conn.close()
=======
# Path to the SQLite database
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "db.sqlite3")

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
