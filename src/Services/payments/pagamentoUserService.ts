const API_BASE = "http://localhost:5000";

interface IDadosPagamento {
    usuario_id?: number | null;
    plano: "comum" | "premium" | null;
    valor: number;
}

interface IEnviarComprovante {
    id_pagamento: number;
    url_imagem: string;
}

export const pagamentoUserService = {

    async gerarPagamento(
        dadosPagamento: IDadosPagamento
    ) {

        const resposta = await fetch(
            `${API_BASE}/pagamento/gerar`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosPagamento)
            }
        );

        const resultado =
            await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                resultado.mensagem ||
                "Falha ao gerar pagamento."
            );
        }

        return resultado;
    },

    async enviarComprovante(
        dados: IEnviarComprovante
    ) {

        const resposta = await fetch(
            `${API_BASE}/pagamento/enviar-comprovante`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(dados)
            }
        );

        const resultado =
            await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                resultado.mensagem ||
                "Falha ao enviar comprovante."
            );
        }

        return resultado;
    }
};