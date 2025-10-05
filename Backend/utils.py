import sqlite3

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
