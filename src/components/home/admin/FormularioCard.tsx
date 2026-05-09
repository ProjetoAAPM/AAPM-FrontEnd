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

const FormularioCard = ({ onSalvar, onExcluir, somenteVisualizacao = false, dadosIniciais = {} }: FormularioCardProps) => {
  const [isEditing, setIsEditing] = useState(!somenteVisualizacao);
  const [dados, setDados] = useState({
    titulo: dadosIniciais.titulo || "",
    local: dadosIniciais.local || "",
    data: dadosIniciais.data || "",
    hora: dadosIniciais.hora || "",
    link: dadosIniciais.link || "",
  });

  const handleChange = (campo: string, valor: string) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
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
      <div className="bg-[#93C2E5] rounded-[18px] px-4 py-4 shadow-sm">
        <div className="flex items-center gap-5 mb-5">
          <input type="text" placeholder="Título" value={dados.titulo} disabled={!isEditing} onChange={(e) => handleChange("titulo", e.target.value)} className="flex-1 h-[36px] bg-[#ECECEC] rounded-[10px] px-8 text-[#101625] font-black text-[1.1rem] outline-none placeholder:text-[#6D6D6D] disabled:text-black" />
          {isEditing && (
            <button onClick={handleSalvar} className="min-w-[128px] h-[38px] bg-[#C83D3D] rounded-full text-white font-black text-[1rem] shadow-md hover:brightness-95 transition-all">
              Salvar
            </button>
          )}
          {!isEditing && somenteVisualizacao && (
            <div className="flex gap-7">
              <button onClick={handleEditar} className="w-[92px] h-[38px] bg-[#C83D3D] rounded-[14px] shadow-md flex items-center justify-center hover:brightness-95 transition-all">
                <img src="/src/assets/icons/Editar.svg" alt="Editar" className="w-6 h-6" />
              </button>
              <button onClick={onExcluir} className="w-[92px] h-[38px] bg-[#C83D3D] rounded-[14px] shadow-md flex items-center justify-center hover:brightness-95 transition-all">
                <img src="/src/assets/icons/Excluir.svg" alt="Excluir" className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-6">
            <div className="min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-4">
              <span className="font-black text-[1.1rem] text-black">Local:</span>
            </div>
            <input type="text" value={dados.local} disabled={!isEditing} onChange={(e) => handleChange("local", e.target.value)} placeholder="Exemplo: Auditório" className="flex-1 h-[38px] bg-[#ECECEC] rounded-[14px] px-8 text-[1rem] text-black outline-none font-semibold placeholder:text-[#767676]" />
          </div>
          <div className="flex gap-6">
            <div className="flex-1 flex items-center gap-6">
              <div className="min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-4">
                <span className="font-black text-[1.1rem] text-black">Data:</span>
              </div>
              <input type="text" value={dados.data} disabled={!isEditing} onChange={(e) => handleChange("data", e.target.value)} placeholder="00/00/0000" className="flex-1 h-[38px] bg-[#A9A9A9] rounded-[14px] px-8 text-center font-black text-[1rem] text-[#4D4D4D] outline-none" />
            </div>
            <div className="flex-1 flex items-center gap-6">
              <div className="min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-4">
                <span className="font-black text-[1.1rem] text-black">Hora:</span>
              </div>
              <input type="text" value={dados.hora} disabled={!isEditing} onChange={(e) => handleChange("hora", e.target.value)} placeholder="00:00" className="flex-1 h-[38px] bg-[#A9A9A9] rounded-[14px] px-8 text-center font-black text-[1rem] text-[#4D4D4D] outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="min-w-[108px] h-[34px] bg-[#ECECEC] rounded-[8px] flex items-center px-4">
              <span className="font-black text-[1.1rem] text-black">Link:</span>
            </div>
            <input type="text" value={dados.link} disabled={!isEditing} onChange={(e) => handleChange("link", e.target.value)} placeholder="Exemplo: www.senai.com.br" className="flex-1 h-[38px] bg-[#ECECEC] rounded-[14px] px-8 text-[#0047FF] font-semibold outline-none placeholder:text-[#767676]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCard;