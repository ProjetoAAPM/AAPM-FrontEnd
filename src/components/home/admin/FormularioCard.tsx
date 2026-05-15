import React, { useState } from "react";

interface FormularioCardProps {
    onSalvar?: (dados: any) => void;
    onExcluir?: () => void;
    somenteVisualizacao?: boolean;
    dadosIniciais?: {
        titulo?: string;
        local?: string;
        data?: string;
        hora?: string;
        link?: string;
    };
}

const FormularioCard = ({
    onSalvar,
    onExcluir,
    somenteVisualizacao = false,
    dadosIniciais = {},
}: FormularioCardProps) => {
    const [isEditing, setIsEditing] = useState(
        Object.keys(dadosIniciais).length === 0
    );

    const [dados, setDados] = useState({
        titulo: dadosIniciais.titulo || "",
        local: dadosIniciais.local || "",
        data: dadosIniciais.data || "",
        hora: dadosIniciais.hora || "",
        link: dadosIniciais.link || "",
    });

    const handleChange = (campo: string, valor: string) => {

    if (campo === "data") {
        valor = valor.replace(/[^\d/]/g, "");

        if (valor.length > 10) return;

        valor = valor
            .replace(/^(\d{2})(\d)/, "$1/$2")
            .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }

    if (campo === "hora") {
        valor = valor.replace(/[^\d:]/g, "");

        if (valor.length > 5) return;

        valor = valor.replace(/^(\d{2})(\d)/, "$1:$2");
    }

    if (campo === "link") {
        valor = valor.trim();
    }

    setDados((prev) => ({
        ...prev,
        [campo]: valor,
    }));
};

    const handleSalvar = () => {
        onSalvar?.(dados);
        setIsEditing(false);
    };

    const handleEditar = () => {
        setIsEditing(true);
    };

    return (
        <div className="w-full">
            <div className="bg-[#93C2E5] rounded-[18px] px-3 sm:px-4 md:px-6 py-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-5">
                    <input type="text" placeholder="Título" value={dados.titulo} disabled={!isEditing} onChange={(e) => handleChange("titulo", e.target.value)} className="flex-1 h-[36px] bg-[#ECECEC] rounded-[10px] px-4 sm:px-6 md:px-8 text-[#101625] font-black text-[0.9rem] sm:text-[1rem] outline-none placeholder:text-[#6D6D6D] disabled:text-black w-full" />

                    {isEditing && (
                        <button
                            onClick={handleSalvar}
                            className="min-w-[100px] sm:min-w-[128px] h-[38px] bg-[#C83D3D] rounded-full text-white font-black text-sm sm:text-[1rem] shadow-md hover:brightness-95 transition-all w-full sm:w-auto"
                        >
                            Salvar
                        </button>
                    )}

                    {!isEditing && !somenteVisualizacao && (
                        <div className="flex gap-3 sm:gap-5 md:gap-7 w-full sm:w-auto justify-end">
                            <button
                                onClick={handleEditar}
                                className="w-[60px] sm:w-[80px] md:w-[92px] h-[38px] bg-[#C83D3D] rounded-[14px] shadow-md flex items-center justify-center hover:brightness-95 transition-all"
                            >
                                <img src="/src/assets/icons/Editar.svg" alt="Editar" className="w-5 sm:w-6" />
                            </button>

                            <button
                                onClick={onExcluir}
                                className="w-[60px] sm:w-[80px] md:w-[92px] h-[38px] bg-[#C83D3D] rounded-[14px] shadow-md flex items-center justify-center hover:brightness-95 transition-all"
                            >
                                <img src="/src/assets/icons/Excluir.svg" alt="Excluir" className="w-5 sm:w-6" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="min-w-[90px] sm:min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-3 sm:px-4">
                            <span className="font-black text-[0.9rem] sm:text-[1.1rem] text-black">
                                Local:
                            </span>
                        </div>

                        <input type="text" value={dados.local} disabled={!isEditing} onChange={(e) => handleChange("local", e.target.value)} className="flex-1 h-[38px] bg-[#ECECEC] rounded-[14px] px-4 sm:px-6 md:px-8 text-[0.9rem] sm:text-[1rem] text-black outline-none font-semibold placeholder:text-[#767676] w-full" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
                            <div className="min-w-[90px] sm:min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-3 sm:px-4">
                                <span className="font-black text-[0.9rem] sm:text-[1.1rem] text-black">
                                    Data:
                                </span>
                            </div>

                            <input type="text" value={dados.data} disabled={!isEditing} onChange={(e) => handleChange("data", e.target.value)} className="flex-1 h-[38px] bg-[#A9A9A9] rounded-[14px] px-4 text-center font-black text-[0.9rem] sm:text-[1rem] text-[#4D4D4D] outline-none w-full" />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
                            <div className="min-w-[90px] sm:min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-3 sm:px-4">
                                <span className="font-black text-[0.9rem] sm:text-[1.1rem] text-black">
                                    Hora:
                                </span>
                            </div>

                            <input type="text" value={dados.hora} disabled={!isEditing} onChange={(e) => handleChange("hora", e.target.value)} className="flex-1 h-[38px] bg-[#A9A9A9] rounded-[14px] px-4 text-center font-black text-[0.9rem] sm:text-[1rem] text-[#4D4D4D] outline-none w-full" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="min-w-[90px] sm:min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-3 sm:px-4">
                            <span className="font-black text-[0.9rem] sm:text-[1.1rem] text-black">
                                Link:
                            </span>
                        </div>

                        <input type="text" value={dados.link} disabled={!isEditing} onChange={(e) => handleChange("link", e.target.value)} className="flex-1 h-[38px] bg-[#ECECEC] rounded-[14px] px-4 sm:px-6 md:px-8 text-[0.9rem] sm:text-[1rem] text-[#0047FF] font-semibold outline-none w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormularioCard;