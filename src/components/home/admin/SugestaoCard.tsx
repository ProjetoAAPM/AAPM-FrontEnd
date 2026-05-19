import React, { useState } from 'react';

interface SugestaoCardProps {
    id: number;
    texto: string;
    usuario?: string;
    modoAdmin?: boolean;
    statusInicial: "PENDENTE" | "APROVADO" | "REPROVADO";
    onAprovar: () => void;
    onReprovar: () => void;
}

const SugestaoCard = ({
    id,
    texto,
    usuario,
    modoAdmin = false,
    statusInicial,
    onAprovar,
    onReprovar
}: SugestaoCardProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(statusInicial);

    return (
        <div className="w-full flex justify-center mb-4">
            <div className="scale-[0.92] origin-top w-full max-w-[1100px]">
                <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-hidden">
                    <div
                        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex flex-col gap-1 flex-1">
                            {usuario && (
                                <p className="text-[#101625] font-bold text-sm">De: {usuario}</p>
                            )}
                            <p className={`text-gray-600 font-medium leading-tight ${!isOpen ? 'line-clamp-2' : ''}`}>
                                {texto}
                            </p>
                        </div>

                        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </div>

                    {isOpen && modoAdmin && (
                        <div className="px-4 pb-4 pt-2 border-t bg-gray-50 flex gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); onReprovar(); }}
                                className="flex-1 py-3 rounded-lg font-bold text-sm border-2 border-red-600 text-red-600 hover:bg-red-50"
                            >
                                Recusar
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setStatus("APROVADO"); onAprovar(); }}
                                className="flex-1 py-3 rounded-lg font-bold text-sm bg-green-600 text-white"
                            >
                                Aprovar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SugestaoCard;