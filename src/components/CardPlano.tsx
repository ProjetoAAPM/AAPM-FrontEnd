import { Star } from "lucide-react";
import type React from "react";

interface CardProps {
    titulo: string;
    fundoTitulo: string;
    className?: string;
    popular?: boolean;
    textoBtn?: string;
    corBtn: string;
    onClick?: () => void;
    children: React.ReactNode;
}

function CardPlano({ titulo, fundoTitulo, className, popular, textoBtn, corBtn, onClick, children } : CardProps) {

    return (
        <div className={`relative w-[270px] md:w-[340px] lg:w-[380px] xl:w-[435px] h-auto mt-10 ${popular ? 'scale-100 lg:scale-105' : ''}`}>
            
            {popular && (
                <div className="absolute inset-0 bg-[#F1D052] rounded-3xl blur-3xl animate-pulse opacity-80 z-0"></div>
            )}

            <div className={`w-full h-full lg:min-h-[619px] flex flex-col items-center text-center shadow-lg relative z-10 rounded-2xl
                ${className}`}>

                {popular && (
                    <div className="absolute w-[90%] max-w-[200px] md:max-w-[270px] h-[35px] md:h-[45px] lg:h-[50px] -top-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#F1D052] via-[#FFEFAF] to-[#F0C72B] rounded-full shadow-md flex justify-center items-center gap-2 z-20">
                        <Star size={24} className="text-[#BE9700]" fill="currentColor"/>
                        <h3 className="text-base md:text-xl font-bold text-[#332900]">MAIS POPULAR</h3>
                    </div>
                )}

                <div className={`${fundoTitulo} flex items-center justify-center mb-4 `}>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 mb-2 md:mt-4 md:mb-4 text-black">
                        {titulo}
                    </h3>
                </div>

                
                <div className=" flex flex-col grow w-full">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        {children}
                    </div>

                    <button onClick={onClick} className={`${corBtn} w-[110px] h-[32px] md:w-[150px] md:h-[44px] lg:w-[180px] lg:h-[54px] mx-auto rounded-md md:rounded-lg lg:rounded-xl font-bold shadow-md hover:scale-105 active:scale-95 transtion-all mt-5 mb-4 text-lg md:text-xl lg:text-2xl cursor-pointer`}>
                        { textoBtn || "Contribuir"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardPlano;