from database import get_connection
import json

def registrar_edicao(id_filme, id_usuario, alteracoes):
    conn = get_connection()
    cursor = conn.cursor()

    # Garante que as alterações sejam salvas como texto/JSON
    if isinstance(alteracoes, dict):
        alteracoes = json.dumps(alteracoes)

    try:
        cursor.execute(
            "INSERT INTO historico_edicoes (id_filme, id_usuario, alteracoes) VALUES (%s, %s, %s)",
            (id_filme, id_usuario, alteracoes)
        )
        conn.commit()
    except Exception as e:
        print(f"Erro ao salvar histórico: {e}")
    finally:
        conn.close()