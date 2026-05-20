import { Check } from "lucide-react";

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
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-1">
                    <Check size={20} className="text-black stroke-1"/>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-black">Confirmar Pagamento</h2>
            <p className="mb-4 text-base">
                Revise os detalhes do seu plano antes de continuar
            </p>

            <div className="mb-4 rounded-lg bg-[#DFF4FF] p-4 text-left">
                <h3 className="mb-3 text-xl font-bold">{info.titulo}</h3>
                <div className="mb-2 flex justify-between text-base font-semibold text-black">
                    <p>Valor:</p>
                    <p className="text-[#43BFFF] font-bold">{info.valor}</p>
                </div>
                <div className="flex justify-between text-base font-semibold text-black">
                    <p>Pontuação:</p>
                    <p className="text-[#43BFFF] font-bold">{info.pontos}</p>
                </div>
            </div>

            <div className="mb-6 rounded-lg bg-[#DFF4FF] p-4 text-left">
                <h3 className="mb-3 text-xl font-bold">Benefícios</h3>
                <ul>
                    {info.beneficios.map((beneficio, index) =>
                        <li key={index} className="flex items-center text-base font-medium text-black">
                            <Check size={15} className="mr-2 text-[#2C903B] stroke-3"/>
                            {beneficio}
                        </li>
                    )}
                </ul>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onConfirmar}
                    className="flex-1 rounded-lg bg-[#86D5FE] py-2 text-2xl font-bold text-[#373737] cursor-pointer"
                >
                    Continuar
                </button>
                <button
                    onClick={onCancelar}
                    className="flex-1 rounded-lg bg-[#373737] py-2 text-2xl font-bold text-white cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default ConfirmarPagamento