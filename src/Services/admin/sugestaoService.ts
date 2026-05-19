const API_BASE = 'http://localhost:5000';

export interface ISugestao {
    id_sugestao: number;
    usuario: string;
    id_usuario: number;
    texto: string;
    status: "PENDENTE" | "APROVADO" | "REPROVADO";
    tipo_usuario: string;
}

export const sugestaoService = {
    async enviarSugestao(texto: string) {
        const res = await fetch(`${API_BASE}/sugestao/enviar`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sugestao: texto })
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || error.mensagem || 'Erro ao enviar sugestão');
        }
        return res.json();
    },

    async listarSugestoes(): Promise<ISugestao[]> {
        const res = await fetch(`${API_BASE}/admin/sugestoes`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro || 'Erro ao carregar sugestões');
        }

        return res.json();
    },

    async aprovarSugestao(id: number) {
        const res = await fetch(`${API_BASE}/sugestao/${id}/status-aprovado`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || 'Erro ao aprovar');
        }
        return res.json();
    },

    async reprovarSugestao(id: number) {
        const res = await fetch(`${API_BASE}/sugestao/${id}/status-reprovado`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro_validacao || 'Erro ao reprovar');
        }
        return res.json();
    }
};