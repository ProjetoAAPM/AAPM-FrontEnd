// src/Services/users/extratoService.ts

const API_BASE = "http://localhost:5000";

export async function buscarExtrato() {

    const res = await fetch(
        `${API_BASE}/usuario/extrato-pontos`,
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
            "Erro ao carregar extrato"
        );
    }

    return res.json();
}