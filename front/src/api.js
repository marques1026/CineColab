// A porta deve ser a mesma do server.py (8001)
const API_BASE_URL = 'http://localhost:8001';

export async function registerUser(userData) {
    try {
        // A rota deve incluir o /api/ que colocamos no server.py
        const response = await fetch(`${API_BASE_URL}/api/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            // Pega a mensagem de erro enviada pelo Python (ex: "Este email já está cadastrado")
            throw new Error(data.error || 'Erro ao cadastrar');
        }

        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}