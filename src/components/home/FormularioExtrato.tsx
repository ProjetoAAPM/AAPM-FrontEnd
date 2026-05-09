import { useEffect, useState } from "react";
import "../Scrollbar/scrollbar.css";
import FormularioCard from "./admin/FormularioCard";

interface FormularioData {
    id?: number;
    titulo: string;
    local: string;
    data: string;
    hora: string;
    link: string;
}

interface ItemExtrato {
    tipo: "premio" | "pontos" | "resgate" | "ganho";
    premio?: string;
    mensagem?: string;
    descricao?: string;
    valor?: number;
    pontos?: number;
}

interface FormularioExtratoProps {
    modoAdmin?: boolean;
    extrato: ItemExtrato[];
}

export default function FormularioExtrato({
    modoAdmin = false,
    extrato
}: FormularioExtratoProps) {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [formulariosSalvos, setFormulariosSalvos] = useState<FormularioData[]>([]);

    // CARREGA DO LOCALSTORAGE
    useEffect(() => {
        const dados = localStorage.getItem("formularios");

        if (dados) {
            setFormulariosSalvos(JSON.parse(dados));
        }
    }, []);

    // SALVA NO LOCALSTORAGE
    useEffect(() => {
        localStorage.setItem(
            "formularios",
            JSON.stringify(formulariosSalvos)
        );
    }, [formulariosSalvos]);

    const salvarNovoFormulario = (dadosDigitados: FormularioData) => {
        const novoFormulario = {
            ...dadosDigitados,
            id: Date.now()
        };

        setFormulariosSalvos((prev) => [
            novoFormulario,
            ...prev
        ]);

        setMostrarFormulario(false);
    };

    const excluirFormulario = (id: number) => {
        const novaLista = formulariosSalvos.filter(
            (formulario) => formulario.id !== id
        );

        setFormulariosSalvos(novaLista);
    };

    return (
        <div className="w-full max-w-[1890px] mx-auto px-4 mt-2">
            
            <div className="flex flex-col lg:flex-row gap-3 lg:h-[93vh]">

                {/* FORMULARIOS */}
                <div
                    className={`
                        bg-[#DDF4FF]
                        ${modoAdmin ? "w-full" : "w-full lg:w-3/4"}
                        h-[93vh]
                        rounded-[15px]
                        shadow-2xl
                        flex
                        flex-col
                        px-5
                        md:px-10
                        py-6
                        relative
                        overflow-hidden
                    `}
                >

                    {/* TITULO */}
                    <div
                        className="
                            absolute
                            top-8
                            left-0
                            bg-white
                            text-[#101625]
                            text-[2rem]
                            md:text-[3rem]
                            font-black
                            px-[120px]
                            md:px-[450px]
                            py-1
                            rounded-r-[10px]
                            shadow-md
                            z-10
                        "
                    >
                        Formulários
                    </div>

                    {/* BOTAO ADMIN */}
                    {modoAdmin && (
                        <button
                            onClick={() =>
                                setMostrarFormulario(!mostrarFormulario)
                            }
                            className="
                                absolute
                                top-12
                                right-10
                                z-20
                                bg-[#C83D3D]
                                text-white
                                rounded-full
                                px-8
                                py-3
                                font-bold
                                hover:brightness-95
                                transition-all
                            "
                        >
                            {mostrarFormulario
                                ? "Cancelar"
                                : "Criar formulário"}
                        </button>
                    )}

                    {/* AREA SCROLL */}
                    <div
                        className="
                            mt-[110px]
                            bg-white
                            flex-1
                            rounded-[10px]
                            shadow-md
                            overflow-hidden
                            min-h-0
                        "
                    >
                        <div
                            className="
                                h-full
                                overflow-y-auto
                                scroll-modern
                                px-2
                                py-5
                            "
                        >

                            <div className="flex flex-col gap-6">

                                {/* CARD CRIAR */}
                                {modoAdmin && mostrarFormulario && (
                                    <FormularioCard
                                        onSalvar={salvarNovoFormulario}
                                        somenteVisualizacao={false}
                                    />
                                )}

                                {/* CARDS */}
                                {formulariosSalvos.map((formulario) => (
                                    <FormularioCard
                                        key={formulario.id}
                                        dadosIniciais={formulario}
                                        somenteVisualizacao={!modoAdmin}
                                        onExcluir={() =>
                                            excluirFormulario(formulario.id!)
                                        }
                                    />
                                ))}

                                {/* VAZIO */}
                                {formulariosSalvos.length === 0 &&
                                    !mostrarFormulario && (
                                        <div
                                            className="
                                                h-[400px]
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-500
                                                font-semibold
                                            "
                                        >
                                            Nenhum formulário salvo ainda.
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* EXTRATO */}
                {!modoAdmin && (
                    <div
                        className="
                            bg-[#BBE1FE]
                            w-full
                            lg:w-1/4
                            h-[93vh]
                            rounded-[15px]
                            shadow-2xl
                            p-4
                            relative
                            flex
                            flex-col
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                absolute
                                top-8
                                right-0
                                bg-white
                                text-[#101625]
                                text-[2rem]
                                font-black
                                px-[120px]
                                py-1
                                rounded-l-[10px]
                                shadow-md
                            "
                        >
                            Extrato
                        </div>

                        <div
                            className="
                                mt-[110px]
                                flex-1
                                rounded-[10px]
                                overflow-hidden
                                min-h-0
                            "
                        >

                            <div
                                className="
                                    h-full
                                    overflow-y-auto
                                    scroll-modern
                                    pr-2
                                "
                            >

                                <div className="p-2 space-y-3">

                                    {extrato.map((item, i) => (
                                        <div
                                            key={i}
                                            className="
                                                bg-white
                                                rounded-[8px]
                                                p-3
                                                shadow-sm
                                                flex
                                                justify-between
                                                items-center
                                            "
                                        >

                                            <div>
                                                {item.tipo === "premio" && (
                                                    <>
                                                        <p className="text-[14px] font-semibold text-yellow-700">
                                                            Prêmio desbloqueado
                                                        </p>

                                                        <p className="text-[15px] font-bold text-black">
                                                            {item.premio}
                                                        </p>
                                                    </>
                                                )}

                                                {item.tipo === "pontos" && (
                                                    <>
                                                        <p className="text-[14px] font-semibold text-gray-700">
                                                            Ganho de pontos
                                                        </p>

                                                        <p className="text-[15px] font-bold text-black">
                                                            {item.mensagem || item.descricao}
                                                        </p>
                                                    </>
                                                )}

                                                {item.tipo === "resgate" && (
                                                    <>
                                                        <p className="text-[14px] font-semibold text-gray-700">
                                                            Reivindicação de pontos
                                                        </p>

                                                        <p className="text-[14px] text-gray-400 font-semibold">
                                                            Brinde: {item.premio}
                                                        </p>
                                                    </>
                                                )}
                                            </div>

                                            <div>
                                                {item.tipo === "ganho" && (
                                                    <p className="text-green-600 font-bold text-[16px]">
                                                        +{item.valor || item.pontos}p
                                                    </p>
                                                )}

                                                {item.tipo === "resgate" && (
                                                    <span className="text-gray-400 text-xl">
                                                        ⭐
                                                    </span>
                                                )}
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}