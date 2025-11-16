from db import get_connection

def get_all_filmes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Filme")
    data = cursor.fetchall()
    conn.close()
    return data
