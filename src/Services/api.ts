const API_BASE = 'http://localhost:5000';

export interface IPagamento {
    id: number;
    nome: string;
    curso: string;
    valor: number;
    data: string;
    status: "Pendente" | "Aprovado" | "Reprovado";
    comprovante_url?: string;
    plano?: string;
}

export const pagamentoAdminService = {
    async listarPagamentos(status?: string): Promise<IPagamento[]> {
        const url = status && status !== 'Todos'
            ? `${API_BASE}/admin/pagamentos?status=${status.toUpperCase()}`
            : `${API_BASE}/admin/pagamentos`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.erro || errorData.mensagem || 'Erro ao carregar pagamentos');
        }

        const data = await res.json();
        console.log("📋 Pagamentos recebidos do backend:", data); // Debug

        return data.map((p: any) => ({
            id: p.id_pagamento || p.id,
            nome: p.aluno_nome || p.usuario?.nome || "Nome não informado",
            curso: p.curso || "Curso não informado",
            valor: Number(p.valor || p.valor_pagamento || 0),
            data: p.data || (p.data_envio ? new Date(p.data_envio).toLocaleDateString('pt-BR') : ""),
            status: p.status === "PENDENTE" ? "Pendente" :
                    p.status === "APROVADO" ? "Aprovado" : "Reprovado",
            comprovante_url: p.comprovante_url || p.comprovantes,
            plano: p.plano || p.descricao_plano || "Não informado"
        }));
    },

    async aprovarPagamento(id: number) {
        const res = await fetch(`${API_BASE}/admin/confirmar-pagamento/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro || 'Erro ao aprovar pagamento');
        }
        return res.json();
    },

    async reprovarPagamento(id: number) {
        const res = await fetch(`${API_BASE}/admin/reprovar-pagamento/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.erro || 'Erro ao reprovar pagamento');
        }
        return res.json();
    }
};