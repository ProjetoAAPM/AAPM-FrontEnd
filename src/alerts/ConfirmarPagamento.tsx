interface ConfirmarPagamentoProps {
    plano: "comum" | "premium";
    onConfirmar: () => void;
    onCancelar: () => void;
}

function ConfirmarPagamento({ plano, onConfirmar, onCancelar }: ConfirmarPagamentoProps) {

    const dadosPlano = {
        comum: {
            titulo: "Plano Comum",
            valor: "R$50,00",
            pontos: "2500 pontos",
            beneficios: [
                "+50 pontos por ação", 
                "Eventos e atividades inclusos", 
                "Brindes padrão"
            ],
        },
        premium: {
            titulo: "Plano Premium",
            valor: "R$100,00",
            pontos: "7000 pontos",
            beneficios: [
                "+70 pontos por ação", 
                "Brindes em dobro", 
                "Gamificação e prêmios exclusivos"
            ],
        }
    };

    const info = dadosPlano[plano];

    return (
        <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 text-center shadow-md">
            <div className="mb-4 flex justify-center">
                <div>
                    ✓
                </div>
            </div>
        </div>
    )
}

export default ConfirmarPagamento