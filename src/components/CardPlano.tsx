import { Star } from "lucide-react";
import { Link } from "react-router-dom";

function CardPlano({ fundoTitulo, titulo, preco, tempo, corTopo, corBtn, corBorda, popular, children, esconderBotao } : any) {
    return (
        <div className={`relative w-full max-w-[435px] h-auto lg:min-h-[619px] mt-10 ${popular ? 'scale-100 lg:scale-105' : ''}`}>
            
            {popular && (
                <div className="absolute inset-0 bg-[#F1D052] rounded-3xl blur-3xl animate-pulse opacity-80 z-0"></div>
            )}

            <div className={`w-full h-full lg:min-h-[619px] flex flex-col items-center text-center shadow-lg relative z-10 border-4 rounded-2xl
                ${popular ? `bg-linear-to-tl from-[#F3DD89] via-[#F6E7AB] to-[#FFF9E0] ${corBorda}` : `bg-white ${corBorda}`}`}>

                {popular && (
                    <div className="absolute w-[90%] max-w-[296px] h-[52px] -top-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#F1D052] via-[#FFEFAF] to-[#F0C72B] rounded-full shadow-md flex justify-center items-center gap-2 z-20">
                        <Star size={24} className="text-[#BE9700]" fill="currentColor"/>
                        <h3 className="text-xl md:text-2xl font-bold text-[#332900]">MAIS POPULAR</h3>
                    </div>
                )}

                <div className={`${fundoTitulo} w-full h-[86px] py-px rounded-t-xl mb-4 ${popular ? 'h-32 pt-5' : ''}`}>
                    <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-4 text-black italic">
                        {titulo}
                    </h3>
                </div>

                <div className={`${corTopo} w-full h-auto min-h-[47px] py-2 font-bold italic text-2xl md:text-3xl mt-4 mb-6`}>
                    {preco} <span className="text-xl md:text-2xl font-normal">{tempo}</span>
                </div>

                <div className="px-6 md:px-8 pb-8 flex flex-col h-full grow w-full">
                    <div className="flex-1">
                        {children}
                    </div>

                    {!esconderBotao && (
                        <Link to="/cadastro" className="mt-6 mb-4">
                            <button className={`${corBtn} w-[224px] max-w-full h-[54px] px-6 py-2 rounded-lg font-bold shadow-md text-black text-xl md:text-2xl cursor-pointer transition-all duration-300 hover:opacity-85 hover:scale-105 active:scale-95`}>
                                Contribuir
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardPlano;