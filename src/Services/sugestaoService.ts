/* import { BACKEND_ATIVO, API_BASE } from "../../config/admin/backend";

export interface ISugestao {
    id_sugestao: number;
    usuario: string;
    id_usuario: number;
    texto: string;
    status: "PENDENTE" | "APROVADO" | "REPROVADO";
    tipo_usuario: string;
}

const STORAGE_KEY = "sugestoes_local";

function pegarSugestoesLocal(): ISugestao[] {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];
    try {
        return JSON.parse(dados);
    } catch {
        return [];
    }
}

function salvarSugestoesLocal(lista: ISugestao[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export const sugestaoService = {

    async enviarSugestao(texto: string) {
        if (!BACKEND_ATIVO) {
            const lista = pegarSugestoesLocal();
            const novaSugestao: ISugestao = {
                id_sugestao: Date.now(),
                usuario: "Usuário",
                id_usuario: 1,
                texto,
                status: "PENDENTE",
                tipo_usuario: "usuario"
            };
            lista.unshift(novaSugestao);
            salvarSugestoesLocal(lista);
            return novaSugestao;
        }

        const res = await fetch(`${API_BASE}/sugestao/enviar`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sugestao: texto })
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(
                error.erro_validacao ||
                error.mensagem ||
                "Erro ao enviar sugestão"
            );
        }
        return res.json();
    },

    async listarSugestoes(): Promise<ISugestao[]> {
        if (!BACKEND_ATIVO) {
            return pegarSugestoesLocal();
        }

        const res = await fetch(`${API_BASE}/admin/sugestoes`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || error.erro_interno || "Erro ao carregar sugestões");
        }

        return res.json();
    },

    async aprovarSugestao(id: number) {
        if (!BACKEND_ATIVO) {
            const lista = pegarSugestoesLocal();
            const atualizada = lista.map(item =>
                item.id_sugestao === id ? { ...item, status: "APROVADO" as const } : item
            );
            salvarSugestoesLocal(atualizada);
            return true;
        }

        const res = await fetch(`${API_BASE}/sugestao/${id}/status-aprovado`, {
            method: "PATCH",
            credentials: "include"
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || error.erro_interno || "Erro ao aprovar");
        }
        return res.json();
    },

    async reprovarSugestao(id: number) {
        if (!BACKEND_ATIVO) {
            const lista = pegarSugestoesLocal();
            const atualizada = lista.map(item =>
                item.id_sugestao === id ? { ...item, status: "REPROVADO" as const } : item
            );
            salvarSugestoesLocal(atualizada);
            return true;
        }

        const res = await fetch(`${API_BASE}/sugestao/${id}/status-reprovado`, {
            method: "PATCH",
            credentials: "include"
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || error.erro_interno || "Erro ao reprovar");
        }
        return res.json();
    }
}; */