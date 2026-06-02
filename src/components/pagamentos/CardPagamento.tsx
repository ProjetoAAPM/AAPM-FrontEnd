import type { IPagamento } from "../../Services/api";

interface CardPagamentoProps {
    data: IPagamento;
    onOpenComprovante: () => void;
}

const CardPagamento = ({
    data,
    onOpenComprovante
}: CardPagamentoProps) => {

    return (

        <div className="w-full bg-white rounded-[12px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-md">

            <div className="flex-1 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex flex-col justify-center">

                <p className="font-bold text-[0.72rem] text-black break-words">
                    Nome: {data.nome}
                </p>

                <p className="font-bold text-[0.72rem] text-black mt-1 break-words">
                    {data.rotulo_vinculo || "Curso"}: {data.curso}
                </p>

            </div>

            <div className="hidden md:block w-[1px] bg-[#BDBDBD] my-4" />

            <div className="w-full md:w-[180px] px-3 sm:px-4 py-2 flex flex-col justify-center text-[0.72rem] font-bold text-black border-t md:border-t-0 border-[#BDBDBD]">

                <p>
                    Valor: R$ {Number(data.valor)
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

                <p className="mt-1">
                    Data: {data.data}
                </p>

            </div>

            <div
                className={`w-full md:w-[110px] min-h-[45px] flex items-center justify-center text-[0.72rem] font-bold ${
                    data.status === "Pendente"
                        ? "bg-[#F2D755] text-black"
                        : data.status === "Aprovado"
                        ? "bg-[#46A9E0] text-white"
                        : "bg-[#C92E2E] text-white"
                }`}
            >

                {data.status}

            </div>

            <div className="w-full md:w-[130px] flex items-center justify-center bg-white py-3">

                <button
                    onClick={onOpenComprovante}
                    className="bg-[#C83D3D] hover:brightness-95 transition-all text-white text-[0.68rem] font-bold px-5 h-[32px] rounded-full shadow-md whitespace-nowrap"
                >

                    Comprovante

                </button>

            </div>

        </div>
    );
};

export default CardPagamento;