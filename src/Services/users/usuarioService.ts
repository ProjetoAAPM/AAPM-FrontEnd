// src/Services/users/usuarioService.ts

const API_BASE = "http://localhost:5000";

export async function buscarPerfil() {

    const res = await fetch(
        `${API_BASE}/usuario/perfil`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!res.ok) {

        const erro = await res
            .json()
            .catch(() => ({}));

        throw new Error(
            erro.erro ||
            erro.erro_validacao ||
            "Erro ao buscar perfil"
        );
    }

    return res.json();
}