import React from "react";
import type { IPagamento } from "./PagamentoAdmin";

interface CardPagamentoProps {
  data: IPagamento;
  onOpenComprovante: () => void;
}

const CardPagamento = ({
  data,
  onOpenComprovante
}: CardPagamentoProps) => {

  return (
    <div
      className="
        w-full
        min-h-[72px]
        bg-white
        rounded-[12px]
        overflow-hidden
        flex
        items-stretch
        shadow-md
      "
    >

      <div className="flex-1 px-5 py-4 flex flex-col justify-center">

        <p className="font-bold text-[0.72rem] text-black">
          Nome: {data.nome}
        </p>

        <p className="font-bold text-[0.72rem] text-black mt-1">
          Curso: {data.curso}
        </p>
      </div>

      <div className="w-[1px] bg-[#BDBDBD] my-4" />

      <div
        className="
          w-[180px]
          px-4
          flex
          flex-col
          justify-center
          text-[0.72rem]
          font-bold
          text-black
        "
      >
        <p>
          Valor: {data.valor.toFixed(2).replace(".", ",")} R$
        </p>

        <p className="mt-2">
          Data: {data.data}
        </p>
      </div>

      <div
        className={`
          w-[110px]
          flex
          items-center
          justify-center
          text-[0.70rem]
          font-bold

          ${data.status === "Pendente" && "bg-[#F2D755] text-black"}
          ${data.status === "Aprovado" && "bg-[#46A9E0] text-white"}
          ${data.status === "Reprovado" && "bg-[#C92E2E] text-white"}
        `}
      >
        {data.status}
      </div>

      <div className="w-[130px] flex items-center justify-center bg-white">

        <button
          onClick={onOpenComprovante}
          className="
            bg-[#C83D3D]
            hover:brightness-95
            transition-all
            text-white
            text-[0.68rem]
            font-bold
            px-5
            h-[32px]
            rounded-full
            shadow-md
          "
        >
          Comprovante
        </button>
      </div>
    </div>
  );
};

export default CardPagamento;