import { useState } from "react";
import "../Scrollbar/scrollbar.css";
import FormularioCard from "./admin/FormularioCard";

interface FormularioData {
  titulo: string;
  local: string;
  data: string;
  hora: string;
  link: string;
}

export default function FormularioExtrato({ modoAdmin = false }) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [formulariosSalvos, setFormulariosSalvos] = useState<
        (FormularioData & { id: number })[]
    >([]);

    const salvarNovoFormulario = (dadosDigitados: FormularioData) => {
        const novo = {
            id: Date.now(),
            ...dadosDigitados
        };

        setFormulariosSalvos(prev => [novo, ...prev]);
        setMostrarFormulario(false);
    };

    const excluirFormulario = (id: number) => {
        setFormulariosSalvos(prev =>
            prev.filter(formulario => formulario.id !== id)
        );
    };

    return (
        <div className="w-full max-w-[1890px] mx-auto px-4 mt-2">

            <div className="flex flex-col lg:flex-row gap-3 lg:h-[93vh]">

                <div
                    className={`
                        bg-[#DDF4FF]
                        w-full
                        ${modoAdmin ? "lg:w-full" : "lg:w-3/4"}
                        rounded-[15px]
                        shadow-2xl
                        flex
                        flex-col
                        px-10
                        py-6
                        relative
                        overflow-hidden
                    `}
                >

                    <div
                        className="
                            absolute
                            top-10
                            left-0
                            bg-white
                            text-[#101625]
                            text-[3rem]
                            font-black
                            px-[450px]
                            py-1
                            rounded-r-[10px]
                            shadow-md
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
                                bg-[#C83D3D]
                                text-white
                                rounded-full
                                h-[45px]
                                px-6
                                absolute
                                top-14
                                right-60
                                z-20
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

                    <div
                        className="
                            mt-[120px]
                            bg-white
                            flex-1
                            rounded-[10px]
                            shadow-md
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                h-full
                                overflow-y-scroll
                                scroll-modern
                                px-1
                                py-5
                            "
                        >

                            <div className="flex flex-col gap-9">

                                {modoAdmin && mostrarFormulario && (
                                    <FormularioCard
                                        onSalvar={salvarNovoFormulario}
                                        somenteVisualizacao={false}
                                    />
                                )}

                                {formulariosSalvos.map((formulario) => (
                                    <FormularioCard
                                        key={formulario.id}
                                        dadosIniciais={formulario}
                                        somenteVisualizacao={true}
                                        onExcluir={() =>
                                            excluirFormulario(formulario.id)
                                        }
                                    />
                                ))}

                                {formulariosSalvos.length === 0 &&
                                    !mostrarFormulario && (
                                        <div
                                            className="
                                                text-center
                                                py-20
                                                text-gray-500
                                                font-medium
                                            "
                                        >
                                            Nenhum formulário salvo ainda.
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}