import { BACKEND_ATIVO } from "../config/admin/backend";

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

const STORAGE_KEY = "pagamentos_admin_mock";

const pagamentosMock: IPagamento[] = [
    {
        id: 1,
        nome: "Maria Eduarda",
        curso: "Desenvolvimento de Sistemas",
        valor: 25,
        data: "20/05/2026",
        status: "Pendente",
        plano: "Plano Ouro",
        comprovante_url: ""
    }
];

function getLocalPagamentos(): IPagamento[] {

    const dados =
        localStorage.getItem(STORAGE_KEY);

    if (!dados) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(pagamentosMock)
        );

        return pagamentosMock;
    }

    return JSON.parse(dados);
}

function salvarLocalPagamentos(
    lista: IPagamento[]
) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(lista)
    );
}

export const pagamentoAdminService = {

    async listarPagamentos(
        status?: string
    ): Promise<IPagamento[]> {

        if (!BACKEND_ATIVO) {

            let lista = getLocalPagamentos();

            if (
                status &&
                status !== "Todos"
            ) {

                lista = lista.filter(
                    (p) =>
                        p.status ===
                        status.slice(0, -1)
                );
            }

            return lista;
        }

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

        if (!BACKEND_ATIVO) {

            const lista =
                getLocalPagamentos();

            const atualizada =
                lista.map((p) =>

                    p.id === id
                        ? {
                              ...p,
                              status:
                                  "Aprovado" as const
                          }
                        : p
                );

            salvarLocalPagamentos(
                atualizada
            );

            return;
        }

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

        if (!BACKEND_ATIVO) {

            const lista =
                getLocalPagamentos();

            const atualizada =
                lista.map((p) =>

                    p.id === id
                        ? {
                              ...p,
                              status:
                                  "Reprovado" as const
                          }
                        : p
                );

            salvarLocalPagamentos(
                atualizada
            );

            return;
        }

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

    if (!BACKEND_ATIVO) {
        return;
    }

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

    if (!BACKEND_ATIVO) {
        return;
    }

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