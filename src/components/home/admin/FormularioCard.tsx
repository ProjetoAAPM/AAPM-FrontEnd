import React from "react";

interface FormularioCardProps {
  onSalvar?: () => void;
  somenteVisualizacao?: boolean;
}

const FormularioCard = ({
  onSalvar,
  somenteVisualizacao = false
}: FormularioCardProps) => {

  return (
    <div className="w-full">
      <div className="bg-[#93C2E5] rounded-[14px] px-3 sm:px-5 py-4 shadow-sm">

        <div className="flex items-center gap-3 mb-4">

          <div className="flex-1">
            <input
              type="text"
              placeholder="Título"
              disabled={somenteVisualizacao}
              className="
                w-[1100px]
                h-[28px]
                rounded-[6px]
                bg-[#E8E8E8]
                px-7
                text-[#5F5F5F]
                font-black
                text-[0.95rem]
                outline-none
                placeholder:text-[#5F5F5F]
                placeholder:font-black
                disabled:cursor-default
              "
            />
          </div>

          {!somenteVisualizacao && (
            <button
              onClick={onSalvar}
              className="
                min-w-[162px]
                h-[33px]
                rounded-full
                bg-[#C83D3D]
                text-white
                font-black
                text-[1rem]
                shadow-md
                hover:brightness-95
                transition-all
              "
            >
              Salvar
            </button>
          )}

        </div>

        <div className="flex items-center gap-3 mb-4">

          <div
            className="
              min-w-[94px]
              h-[33px]
              rounded-[7px]
              bg-[#ECECEC]
              flex items-center
              px-3
            "
          >
            <span className="text-black font-black text-[1rem] bg-[#F3F3F3]">
              Local:
            </span>
          </div>

          <input
            type="text"
            placeholder="Exemplo: Auditório"
            disabled={somenteVisualizacao}
            className="
              flex-1
              h-[33px]
              rounded-[14px]
              bg-[#EDEDED]
              px-8
              text-[#757575]
              font-semibold
              text-[0.95rem]
              outline-none
              placeholder:text-[#757575]
              disabled:cursor-default
            "
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">

          <div className="flex items-center gap-3 flex-1">

            <div
              className="
                min-w-[94px]
                h-[33px]
                rounded-[7px]
                bg-[#ECECEC]
                flex items-center
                px-3
              "
            >
              <span className="text-black font-black text-[1rem]">
                Data:
              </span>
            </div>

            <input
              type="text"
              placeholder="00/00/0000"
              disabled={somenteVisualizacao}
              className="
                flex-1
                h-[33px]
                rounded-[14px]
                bg-[#A0A0A0]
                px-6
                text-center
                text-[#666666]
                font-black
                text-[1rem]
                outline-none
                placeholder:text-[#666666]
                disabled:cursor-default
              "
            />
          </div>

          <div className="flex items-center gap-3 flex-1">

            <div
              className="
                min-w-[94px]
                h-[33px]
                rounded-[7px]
                bg-[#ECECEC]
                flex items-center
                px-3
              "
            >
              <span className="text-black font-black text-[1rem] bg-[#F3F3F3]">
                Hora:
              </span>
            </div>

            <input
              type="text"
              placeholder="00:00"
              disabled={somenteVisualizacao}
              className="
                flex-1
                h-[33px]
                rounded-[14px]
                bg-[#A0A0A0]
                px-6
                text-center
                text-[#666666]
                font-black
                text-[1rem]
                outline-none
                placeholder:text-[#666666]
                disabled:cursor-default
              "
            />
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div
            className="
              min-w-[94px]
              h-[33px]
              rounded-[7px]
              bg-[#ECECEC]
              flex items-center
              px-3
            "
          >
            <span className="text-black font-black text-[1rem] bg-[#F3F3F3]">
              Link:
            </span>
          </div>

          <input
            type="text"
            placeholder="Exemplo: www.senai.com.br"
            disabled={somenteVisualizacao}
            className="
              flex-1
              h-[33px]
              rounded-[14px]
              bg-[#D3D3D3]
              px-8
              text-[#757575]
              font-semibold
              text-[0.9rem]
              outline-none
              placeholder:text-[#757575]
              disabled:cursor-default
            "
          />
        </div>

      </div>
    </div>
  );
};

export default FormularioCard;