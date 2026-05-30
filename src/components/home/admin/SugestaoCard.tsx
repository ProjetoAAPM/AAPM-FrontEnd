import React, { useState } from 'react';

interface SugestaoCardProps {
    id: number;
    texto: string;
    usuario?: string;
    modoAdmin?: boolean;
    statusInicial: "PENDENTE" | "APROVADO" | "REPROVADO";
    onAprovar: () => Promise<void> | void;
    onReprovar: () => Promise<void> | void;
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
    const [isProcessing, setIsProcessing] = useState<'aprovar' | 'reprovar' | 'desfixar' | null>(null);
    const [isDismissed, setIsDismissed] = useState(false);

    const handleAction = async (action: 'aprovar' | 'reprovar' | 'desfixar') => {
        setIsProcessing(action);
        try {
            if (action === 'aprovar') {
                await onAprovar();
                setStatus("APROVADO");
            } else {
                await onReprovar();
                setStatus("REPROVADO");
                setIsDismissed(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(null);
        }
    };

    if (isDismissed && !isProcessing) {
        return null;
    }

    const isAprovado = status === "APROVADO";

    return (
        <div 
            className={`w-full flex justify-center mb-4 transition-all duration-500 ease-in-out ${
                isDismissed ? "opacity-0 scale-y-0 max-h-0 mb-0 overflow-hidden" : "max-h-[500px]"
            }`}
        >
            <div className="scale-[0.92] origin-top w-full max-w-[1100px]">
                <div 
                    className={`bg-white rounded-[10px] shadow-sm border overflow-hidden transition-all duration-300 ${
                        isAprovado ? 'border-green-500 ring-2 ring-green-500/20 shadow-md' : 'border-gray-100'
                    }`}
                >
                    {isAprovado && (
                        <div className="bg-green-50 px-4 py-1.5 flex items-center gap-1.5 border-b border-green-100">
                            <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Sugestão Fixada</span>
                        </div>
                    )}

                    <div
                        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                            isProcessing ? 'pointer-events-none opacity-60' : ''
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex flex-col gap-1 flex-1 pr-4">
                            {usuario && (
                                <p className="text-[#101625] font-bold text-sm flex items-center gap-2">
                                    De: {usuario}
                                    {status !== "PENDENTE" && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                                            isAprovado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {status}
                                        </span>
                                    )}
                                </p>
                            )}
                            <p className={`text-gray-600 font-medium leading-tight ${!isOpen ? 'line-clamp-2' : ''}`}>
                                {texto}
                            </p>
                        </div>

                        <div className={`transform transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </div>

                    {isOpen && modoAdmin && (
                        <div className="px-4 pb-4 pt-2 border-t bg-gray-50 flex gap-3">
                            {isAprovado ? (
                                <button
                                    disabled={isProcessing !== null}
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleAction('desfixar'); 
                                    }}
                                    className={`flex-1 py-3 rounded-lg font-bold text-sm border-2 border-gray-400 text-gray-600 transition-colors bg-white ${
                                        isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-800 active:scale-[0.99]'
                                    }`}
                                >
                                    {isProcessing === 'desfixar' ? "Removendo..." : "Desfixar"}
                                </button>
                            ) : (
                                <>
                                    <button
                                        disabled={isProcessing !== null}
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleAction('reprovar'); 
                                        }}
                                        className={`flex-1 py-3 rounded-lg font-bold text-sm border-2 border-red-600 text-red-600 transition-colors ${
                                            isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'
                                        }`}
                                    >
                                        {isProcessing === 'reprovar' ? "Recusando..." : "Recusar"}
                                    </button>
                                    
                                    <button
                                        disabled={isProcessing !== null}
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleAction('aprovar'); 
                                        }}
                                        className={`flex-1 py-3 rounded-lg font-bold text-sm bg-green-600 text-white transition-all ${
                                            isProcessing 
                                                ? 'opacity-50 cursor-not-allowed' 
                                                : 'hover:bg-green-700 active:scale-[0.99]'
                                        }`}
                                    >
                                        {isProcessing === 'aprovar' ? "Aprovando..." : "Aprovar"}
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SugestaoCard;