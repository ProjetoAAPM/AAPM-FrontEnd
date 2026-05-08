import React from "react";
import type { IPagamento } from "./PagamentoAdmin";

interface CardPagamentoProps {
  data: IPagamento;
  onOpenComprovante: () => void;
}

const CardPagamento = ({ data, onOpenComprovante }: CardPagamentoProps) => {
  return (
    <div className="max-w-[1300px] bg-white rounded-[12px] p-5 flex items-center justify-between text-black relative group shadow-md border border-gray-100 hover:shadow-lg transition-all overflow-hidden">
      
      <div className="flex-1">
        <p className="font-bold text-[15px]">
          Nome: <span className="font-medium text-gray-700">{data.nome}</span>
        </p>
        <p className="font-bold text-[15px] mt-1">
          Curso: <span className="font-medium text-gray-700">{data.curso}</span>
        </p>
      </div>

      <div className="w-[1px] h-12 bg-gray-500 mx-8 hidden md:block" />

      <div className="flex items-center gap-8">
        
        <div className="text-right">
          <p className="font-bold text-[15px]">Valor: {data.valor.toFixed(2).replace('.', ',')} R$</p>
          <p className="font-bold text-[15px] mt-1">Data: {data.data}</p>
        </div>

        <div className={`
          min-w-[110px] px-6 py-2.5 rounded-[8px] font-bold text-center text-sm
          ${data.status === 'Pendente' ? 'bg-[#FFD966] text-black' : 
            data.status === 'Aprovado' ? 'bg-[#4FA8D1] text-white' : 
            'bg-[#C83D3D] text-white'}
        `}>
          {data.status}
        </div>

        <button
          onClick={onOpenComprovante}
          className="bg-[#C83D3D] hover:bg-[#b22f2f] text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
        >
          Comprovante
        </button>
      </div>
    </div>
  );
};

export default CardPagamento;