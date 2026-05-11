import { useEffect, useState } from "react";
import SugestaoCard from './admin/SugestaoCard';
import "../Scrollbar/scrollbar.css";

interface SugestoesProps {
    modoAdmin?: boolean;
}

export default function Sugestoes({ modoAdmin = false }: SugestoesProps) {
    const [texto, setTexto] = useState("");
    const [listaDeStrings, setListaDeStrings] = useState<string[]>([]);

    useEffect(() => {
        const dados = localStorage.getItem("sugestoes");
        if (dados) setListaDeStrings(JSON.parse(dados));
    }, []);

    useEffect(() => {
        localStorage.setItem("sugestoes", JSON.stringify(listaDeStrings));
    }, [listaDeStrings]);

    const removerSugestao = (indexParaRemover: number) => {
        setListaDeStrings(listaDeStrings.filter((_, index) => index !== indexParaRemover));
    };

    function enviarSugestao() {
        if (texto.trim()) {
            setListaDeStrings((prev) => [texto, ...prev]);
            setTexto("");
        }
    }

    return (
        <div className="w-full max-w-[1890px] mx-auto px-4 sm:px-6 md:px-10 min-h-[85vh] mt-5 md:mt-2 mb-2">
            <div className="bg-[#C83D3D] w-full min-h-[85vh] rounded-[15px] shadow-2xl px-4 sm:px-6 md:px-10 relative overflow-hidden pb-20">
                <div className="absolute top-6 sm:top-10 right-0 bg-white text-[#101625] text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-black px-20 sm:px-32 md:px-[300px] lg:px-[400px] xl:px-[600px] py-2 rounded-l-[10px] shadow-md z-20">
                    Sugestões
                </div>

                {!modoAdmin && (
                    <div className="absolute top-24 sm:top-40 md:top-52 lg:top-60 left-0 bg-white text-[#101625] text-[0.8rem] sm:text-[1rem] font-black px-6 sm:px-20 md:px-[200px] lg:px-[300px] xl:px-[400px] py-2 rounded-r-[5px] shadow-md z-20">
                        Você tem alguma sugestão? Compartilhe com a gente!
                    </div>
                )}

                <div className={`left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 relative ${modoAdmin ? "mt-[120px] sm:mt-[160px] md:mt-[200px]" : "mt-[180px] sm:mt-[220px] md:mt-[260px] lg:mt-[300px]"}`}>
                    <div className={`${modoAdmin ? "bg-[#D86062]" : "bg-white"} rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[400px] sm:h-[450px] md:h-[500px] flex flex-col overflow-hidden relative`}>
                        {modoAdmin ? (
                            <div className="flex-1 overflow-y-auto scroll-modern px-4 py-6">
                                <div className="flex flex-col gap-3">
                                    {listaDeStrings.length > 0 ? (
                                        listaDeStrings.map((str, index) => (
                                            <SugestaoCard
                                                key={index}
                                                texto={str}
                                                modoAdmin={true}
                                                onRecusar={() => removerSugestao(index)}
                                            />
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-full min-h-[300px]">
                                            <p className="text-white opacity-50 font-semibold">Nenhuma sugestão ainda.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <textarea
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                placeholder="Digite sua sugestão aqui."
                                className="w-full h-full px-6 py-14 resize-none outline-none text-center text-[#A8A8A8] font-semibold text-lg scroll-modern overflow-y-auto"
                            />
                        )}
                    </div>

                    {!modoAdmin && (
                        <button
                            onClick={enviarSugestao}
                            className="mt-6 sm:mt-10 bg-[#383636] text-white px-8 sm:px-12 py-2 sm:py-3 rounded-[10px] font-extrabold text-[1.2rem] sm:text-[1.8rem] hover:scale-105 transition"
                        >
                            Enviar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}