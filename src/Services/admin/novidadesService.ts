import { BACKEND_ATIVO } from "../../config/admin/backend"

const API_BASE = "http://localhost:5000";

export const novidadesService = {

    async salvarNovidade(chave: string, valor: any) {

        if (!BACKEND_ATIVO) {
            throw new Error("enviando... erro ao enviar (backend não ativo)");
        }

        const res = await fetch(`${API_BASE}/novidades/salvar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chave,
                valor
            })
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.mensagem || "Erro ao salvar novidade");
        }

        return res.json();
    },

    async buscarNovidade(chave: string) {

        if (!BACKEND_ATIVO) {
            throw new Error("Backend não ativo");
        }

        const res = await fetch(`${API_BASE}/novidades/${chave}`);

        if (!res.ok) {
            throw new Error("Erro ao buscar novidade");
        }

        return res.json();
    }
};