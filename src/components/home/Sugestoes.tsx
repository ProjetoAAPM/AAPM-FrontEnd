import { useEffect, useState } from "react";
import SugestaoCard from './admin/SugestaoCard';
import "../Scrollbar/scrollbar.css";
import filtroIcon from "../../assets/icons/icone_filtro.svg";

interface SugestoesProps {
    modoAdmin?: boolean;
}

interface ISugestao {
    texto: string;
    status: "Pendente" | "Aprovado";
}

export default function Sugestoes({ modoAdmin = false }: SugestoesProps) {

    const [texto, setTexto] = useState("");

    const [listaDeStrings, setListaDeStrings] = useState<ISugestao[]>([]);

    const [filtro, setFiltro] = useState<"Todos" | "Pendentes" | "Aprovados">("Todos");

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const dados = localStorage.getItem("sugestoes");

        if (dados) {
            setListaDeStrings(JSON.parse(dados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sugestoes", JSON.stringify(listaDeStrings));
    }, [listaDeStrings]);

    const removerSugestao = (indexParaRemover: number) => {
        setListaDeStrings(
            listaDeStrings.filter((_, index) => index !== indexParaRemover)
        );
    };

    function enviarSugestao() {

        if (!texto.trim()) return;

        const hoje = new Date().toISOString().split("T")[0];

        const ultimaSugestao = localStorage.getItem("ultimaSugestao");

        if (ultimaSugestao === hoje) {
            alert("Você já enviou uma sugestão hoje. Mande novamente amanhã!");
            return;
        }

        setListaDeStrings((prev) => [
            {
                texto,
                status: "Pendente"
            },
            ...prev
        ]);

        localStorage.setItem("ultimaSugestao", hoje);

        setTexto("");
    }

    const dadosExibidos = listaDeStrings.filter((item) => {

        if (filtro === "Todos") return true;

        if (filtro === "Pendentes") {
            return item.status === "Pendente";
        }

        if (filtro === "Aprovados") {
            return item.status === "Aprovado";
        }

        return true;
    });

    return (
        <div className="w-full max-w-[1890px] mx-auto px-4 sm:px-6 md:px-10 min-h-[85vh] mt-5 md:mt-2 mb-2">

            <div className="bg-[#C83D3D] w-full min-h-[85vh] rounded-[15px] shadow-2xl px-4 sm:px-6 md:px-10 relative overflow-hidden pb-20">

                <div className="absolute top-8 right-0 bg-white text-[#101625] text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-black px-20 sm:px-32 md:px-[280px] lg:px-[400px] xl:px-[600px] py-1 rounded-l-[10px] shadow-md z-10 flex items-center justify-center max-w-[90%]">
                    Sugestões
                </div>

                {!modoAdmin && (
                    <div className="absolute top-24 sm:top-40 md:top-40 lg:top-50 left-0 bg-white text-[#101625] text-[0.8rem] sm:text-[1rem] font-black px-6 sm:px-20 md:px-[200px] lg:px-[300px] xl:px-[400px] py-2 rounded-r-[5px] shadow-md z-20">
                        Você tem alguma sugestão? Compartilhe com a gente!
                    </div>
                )}

                <div
                    className={`left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 relative ${
                        modoAdmin
                            ? "mt-[120px] sm:mt-[160px] md:mt-[200px]"
                            : "mt-[180px] sm:mt-[220px] md:mt-[260px]"
                    }`}
                >

                    {modoAdmin && (
                        <div className="w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mb-4 relative">

                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 sm:gap-5 md:gap-8 relative z-40"
                            >

                                <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <img
                                        src={filtroIcon}
                                        alt="filtro"
                                        className="w-full h-full scale-[1.8] sm:scale-[2] md:scale-[2.5] transform object-contain md:-mr-15 translate-y-1 sm:translate-y-2 md:translate-y-3"
                                    />
                                </div>

                                <span className="text-white font-bold text-[1rem] sm:text-[1.1rem] md:text-xl ml-1 sm:ml-3 md:ml-6">
                                    {filtro}
                                </span>

                            </button>

                            {showDropdown && (
                                <div className="absolute top-11 sm:top-12 md:top-13 left-0 bg-white rounded-xl shadow-2xl py-2 z-50 w-40 sm:w-44 md:w-48">

                                    {["Todos", "Pendentes", "Aprovados"].map((opt) => (

                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setFiltro(opt as any);
                                                setShowDropdown(false);
                                            }}
                                            className="w-full text-left px-4 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 font-bold text-[#101625] text-[0.9rem] sm:text-[1rem]"
                                        >
                                            {opt}
                                        </button>

                                    ))}

                                </div>
                            )}

                        </div>
                    )}

                    <div className={`${modoAdmin ? "bg-[#D86062]" : "bg-white"} rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[400px] sm:h-[450px] md:h-[300px] xl:h-[400px] flex flex-col overflow-hidden relative`}>

                        {modoAdmin ? (

                            <div className="flex-1 overflow-y-auto scroll-modern px-4 py-6">

                                <div className="flex flex-col gap-3">

                                    {dadosExibidos.length > 0 ? (

                                        dadosExibidos.map((str, index) => (

                                            <SugestaoCard
                                                key={index}
                                                texto={str.texto}
                                                statusInicial={str.status}
                                                modoAdmin={true}
                                                onRecusar={() => removerSugestao(index)}
                                                onAprovar={() => {

                                                    setListaDeStrings(prev =>
                                                        prev.map((item, i) =>
                                                            i === index
                                                                ? { ...item, status: "Aprovado" }
                                                                : item
                                                        )
                                                    );

                                                }}
                                            />

                                        ))

                                    ) : (

                                        <div className="flex items-center justify-center h-full py-[180px] md:max-[1329px]:py-[135px] min-[1330px]:py-[175px] ">
                                            <p className="text-white opacity-50 font-semibold ">
                                                Nenhuma sugestão ainda.
                                            </p>
                                        </div>

                                    )}

                                </div>

                            </div>

                        ) : (

                            <textarea
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                placeholder="Digite sua sugestão aqui."
                                className="w-full h-full px-6 py-[180px] md:max-[1329px]:py-[135px] min-[1330px]:py-[175px] resize-none outline-none text-center text-[#A8A8A8] font-semibold text-lg scroll-modern overflow-y-auto"
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