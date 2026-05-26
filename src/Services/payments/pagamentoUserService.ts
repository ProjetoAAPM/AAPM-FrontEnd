import { API_BASE } from "../../config/admin/backend";

interface IDadosPagamento {
    usuario_id?: number | null;
    plano: "comum" | "premium" | null;
    valor: number;
}

export const pagamentoUserService = {

    async gerarPagamento(dadosPagamento: IDadosPagamento) {
        const resposta = await fetch(`${API_BASE}/pagamento/gerar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosPagamento)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.erro_validacao ||
                resultado.erro_interno ||
                resultado.erro ||
                resultado.mensagem ||
                "Falha ao gerar pagamento."
            );
        }

        return resultado;
    },

    async enviarComprovante(idPagamento: number, urlImagem: string) {
        const resposta = await fetch(`${API_BASE}/pagamento/enviar-comprovante`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_pagamento: idPagamento,
                url_imagem: urlImagem
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.erro_validacao ||
                resultado.erro_interno ||
                resultado.erro ||
                resultado.mensagem ||
                "Falha ao enviar comprovante."
            );
        }

        return resultado;
    }
};