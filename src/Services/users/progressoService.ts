// src/Services/users/progressoService.ts

const API_BASE = "http://localhost:5000";

export async function buscarProgresso() {

    const res = await fetch(
        `${API_BASE}/usuario/meu-progresso`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!res.ok) {

        throw new Error(
            "Erro ao carregar progresso"
        );
    }

    return res.json();
}