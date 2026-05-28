const API_BASE = "http://localhost:5000";

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

    async listarPagamentos(
        status?: string
    ): Promise<IPagamento[]> {

        const url =
            status && status !== "Todos"
                ? `${API_BASE}/admin/pagamentos?status=${status.toUpperCase()}`
                : `${API_BASE}/admin/pagamentos`;

        const res = await fetch(url, {

            method: "GET",

            credentials: "include",

            headers: {
                "Content-Type":
                    "application/json"
            }

        });

        if (!res.ok) {

            const erro =
                await res
                    .json()
                    .catch(() => ({}));

            throw new Error(
                erro.erro ||
                erro.mensagem ||
                "Erro ao carregar pagamentos"
            );
        }

        const data = await res.json();

        return data.map((p: any) => ({

            id:
                p.id_pagamento ||
                p.id,

            nome:
                p.aluno_nome ||
                "Nome não informado",

            curso:
                p.curso ||
                "Curso não informado",

            valor: Number(
                p.valor ||
                p.valor_pagamento ||
                0
            ),

            data:
                p.data ||
                "",

            status:
                p.status === "PENDENTE"
                    ? "Pendente"
                    : p.status === "APROVADO"
                    ? "Aprovado"
                    : "Reprovado",

            comprovante_url:
                p.comprovante_url ||
                p.comprovantes ||
                "",

            plano:
                p.plano ||
                p.descricao_plano ||
                "Não informado"

        }));
    },

    async aprovarPagamento(
        id: number
    ) {

        const res = await fetch(

            `${API_BASE}/admin/confirmar-pagamento/${id}`,

            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );

        if (!res.ok) {

            const erro =
                await res
                    .json()
                    .catch(() => ({}));

            throw new Error(
                erro.erro ||
                erro.mensagem ||
                "Erro ao aprovar pagamento"
            );
        }

        return res.json();
    },

    async reprovarPagamento(
        id: number
    ) {

        const res = await fetch(

            `${API_BASE}/admin/reprovar-pagamento/${id}`,

            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json"
                }
            }
        );

        if (!res.ok) {

            const erro =
                await res
                    .json()
                    .catch(() => ({}));

            throw new Error(
                erro.erro ||
                erro.mensagem ||
                "Erro ao reprovar pagamento"
            );
        }

        return res.json();
    }
};

export async function verificarAdminHome() {

    const res = await fetch(
        `${API_BASE}/admin/home`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!res.ok) {
        throw new Error("Acesso negado");
    }

    return res.json();
}

export async function verificarAdminEditar() {

    const res = await fetch(
        `${API_BASE}/admin/editar`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!res.ok) {
        throw new Error("Acesso negado");
    }

    return res.json();
}