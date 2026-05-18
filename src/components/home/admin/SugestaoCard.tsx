import React, { useState } from 'react';

interface SugestaoProps {
    texto: string;
    modoAdmin?: boolean;
    onRecusar: () => void;
    onAprovar: () => void;
    statusInicial: "Pendente" | "Aprovado";
}

const SugestaoCard = ({
    texto,
    modoAdmin = false,
    onRecusar,
    onAprovar,
    statusInicial
}: SugestaoProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const [status, setStatus] = useState<"Pendente" | "Aprovado">(statusInicial);

    return (

        <div className="w-fullflex justify-center">
            
            <div className="scale-[0.90] origin-top w-full">

                <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-hidden">

                    <div
                        className="flex items-center justify-between px-3 md:px-4 lg:px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >

                        <div className="flex flex-col gap-1 flex-1 pr-2">

                            <div className="flex items-center gap-2">

                                <span className="text-[#101625] font-black text-[0.75rem] md:text-[0.9rem] lg:text-[1.1rem]">
                                    Sugestão:
                                </span>

                                {modoAdmin && (

                                    <span
                                        className={`${status === 'Aprovado'
                                                ? 'bg-green-600'
                                                : 'bg-yellow-500'
                                            } text-white text-[7px] md:text-[9px] lg:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}
                                    >
                                        {status}
                                    </span>

                                )}

                            </div>

                            <p
                                className={`text-gray-500 font-medium text-[0.75rem] md:text-[0.85rem] lg:text-[1rem] leading-tight transition-all ${!isOpen ? 'line-clamp-1' : 'whitespace-pre-wrap'}`}
                            >
                                {texto}
                            </p>

                        </div>

                        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`}>

                            <svg
                                className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>

                        </div>

                    </div>

                    {isOpen && modoAdmin && (

                        <div className="px-3 md:px-4 lg:px-6 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30 flex flex-wrap sm:flex-nowrap gap-2 animate-in fade-in slide-in-from-top-1">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRecusar();
                                }}
                                className="flex-1 min-w-[80px] py-2 md:py-2.5 rounded-lg font-black text-[8px] md:text-[10px] lg:text-[12px] uppercase border-2 bg-white border-red-600 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Recusado
                            </button>

                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    setStatus("Aprovado");

                                    onAprovar();

                                }}
                                className="flex-1 min-w-[80px] py-2 md:py-2.5 rounded-lg font-black text-[8px] md:text-[10px] lg:text-[12px] uppercase border-2 bg-green-600 text-white border-transparent"
                            >
                                Aprovado
                            </button>

                        </div>

                    )}

                </div>
            </div>
        </div>

    );
};

export default SugestaoCard;