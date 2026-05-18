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

    useEffect(() => {
        const dados = localStorage.getItem("formularios");

        if (dados) {
            setFormulariosSalvos(JSON.parse(dados));
        }
    }, []);

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

    const formulariosVisiveis = formulariosSalvos.filter((formulario) => {

        const [dia, mes, ano] = formulario.data.split("/");
        const [hora, minuto] = formulario.hora.split(":");

        const dataHoraFormulario = new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia),
            Number(hora),
            Number(minuto)
        );

        const agora = new Date();

        return dataHoraFormulario >= agora;
    });

    return (
        <div className="w-full max-w-[1890px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10 mt-2 overflow-x-hidden">

            <div className="flex flex-col lg:flex-row gap-3 lg:h-[93vh] overflow-hidden">

                <div
                    className={`
                        bg-[#DDF4FF]

                        ${modoAdmin
                            ? "w-full"
                            : "w-full lg:w-3/4"
                        }
                        h-[93vh]

                        rounded-[15px]
                        shadow-2xl

                        flex
                        flex-col

                        px-3
                        sm:px-5
                        md:px-10

                        py-6

                        relative
                        overflow-hidden
                    `}
                >

                    <div
                        className="
                            absolute
                            top-8
                            left-0

                            bg-white
                            text-[#101625]

                            text-[1.3rem]
                            sm:text-[2rem]
                            md:text-[3rem]

                            font-black

                            px-10
                            sm:px-24
                            md:px-[220px]
                            lg:px-[350px]
                            xl:px-[520px]

                            py-1

                            rounded-r-[10px]
                            shadow-md

                            z-10

                            flex
                            items-center
                            justify-center

                            max-w-[90%]
                        "
                    >
                        Formulários
                    </div>

                    {modoAdmin && (
                        <button
                            onClick={() =>
                                setMostrarFormulario(!mostrarFormulario)
                            }
                            className="
                                absolute

                                top-21
                                md:top-31

                                right-3
                                sm:right-6
                                md:right-10

                                z-20

                                bg-[#C83D3D]
                                text-white

                                rounded-full

                                px-4
                                sm:px-6
                                md:px-8

                                py-2
                                sm:py-3

                                font-bold

                                hover:brightness-95
                                transition-all

                                whitespace-nowrap
                            "
                        >
                            {mostrarFormulario
                                ? "Cancelar"
                                : "Criar formulário"}
                        </button>
                    )}

                    <div
                        className={`
                            mt-[110px]
                            md:mt-[160px]

                            bg-white

                            rounded-[12px]
                            shadow-md

                            w-full

                            max-w-[95%]
                            sm:max-w-[800px]
                            md:max-w-[1100px]
                            lg:max-w-[1300px]

                            mx-auto

                            ${modoAdmin
                                ? "min-h-[400px] sm:h-[240px] md:h-[320px] lg:h-[450px]"
                                : "min-h-[400px] sm:h-[220px] md:h-[280px] lg:h-[350px]"
                            }

                            overflow-hidden
                        `}
                    >

                        <div className="h-full overflow-y-auto scroll-modern px-2 py-5">

                            <div className="flex flex-col gap-6">

                                {modoAdmin && mostrarFormulario && (
                                    <FormularioCard
                                        onSalvar={salvarNovoFormulario}
                                        somenteVisualizacao={false}
                                    />
                                )}

                                {(modoAdmin
                                    ? formulariosSalvos
                                    : formulariosVisiveis
                                ).map((formulario) => (

                                    <FormularioCard
                                        key={formulario.id}
                                        dadosIniciais={formulario}
                                        somenteVisualizacao={!modoAdmin}
                                        onExcluir={() =>
                                            excluirFormulario(formulario.id!)
                                        }
                                    />
                                ))}

                                {formulariosSalvos.length === 0 &&
                                    !mostrarFormulario && (
                                        <div
                                            className="
                                                py-[180px]
                                                flex
                                                items-center
                                                justify-center

                                                text-gray-500
                                                font-semibold
                                                text-center

                                                px-4
                                            "
                                        >
                                            Nenhum formulário salvo ainda.
                                        </div>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>

                {!modoAdmin && (
                    <div
                        className="
                            bg-[#BBE1FE]

                            w-full
                            lg:w-1/4

                            h-[93vh]

                            rounded-[15px]
                            shadow-2xl

                            p-3
                            sm:p-4

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

                                text-[1.5rem]
                                sm:text-[2rem]

                                font-black

                                px-10
                                sm:px-16
                                md:px-[120px]

                                py-1

                                rounded-l-[10px]
                                shadow-md
                            "
                        >
                            Extrato
                        </div>

                        <div className="mt-[110px] flex-1 overflow-y-auto scroll-modern pr-2">

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
                )}

            </div>
        </div>
    );
}