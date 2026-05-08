import React from "react";
import type { IPagamento } from "./PagamentoAdmin"; 

interface ModalProps {
  data: IPagamento;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const CardComprovante: React.FC<ModalProps> = ({ data, onClose, onApprove, onReject }) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[650px] overflow-hidden shadow-2xl">
        
        <div className="bg-[#101625] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-red-600">AAPM</div>
             <h3 className="text-white font-black text-lg">Comprovante</h3>
          </div>
          <button onClick={onClose} className="text-white text-3xl font-bold hover:scale-110 transition-transform">×</button>
        </div>

        <div className="p-8 bg-[#E7F2F8]">
          <h2 className="text-center font-black text-[#101625] text-2xl mb-8">Comprovante de transação</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
               <div className="border-b border-blue-200 pb-2">
                 <p className="text-[#8BA6B5] font-bold text-xs uppercase tracking-widest">Nome</p>
                 <p className="font-black text-[#101625] text-lg">{data.nome}</p>
               </div>
               <div className="border-b border-blue-200 pb-2">
                 <p className="text-[#8BA6B5] font-bold text-xs uppercase tracking-widest">Valor</p>
                 <p className="font-black text-[#101625] text-lg">R${data.valor.toFixed(2)}</p>
               </div>
               <div className="border-b border-blue-200 pb-2">
                 <p className="text-[#8BA6B5] font-bold text-xs uppercase tracking-widest">Pago em</p>
                 <p className="font-black text-[#101625] text-lg">{data.data}</p>
               </div>
            </div>

            <div className="flex-1">
              <div className="aspect-square bg-[#3E4E56] rounded-xl flex items-center justify-center p-4 border-4 border-white shadow-inner">
                <div className="text-center">
                   <div className="w-20 h-20 border-4 border-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                   </div>
                   <p className="text-white/40 font-black text-xs uppercase">Preview Comprovante</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={() => onApprove(data.id)}
              className="flex-1 bg-[#4FA8D1] text-white py-3 rounded-full font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Aprovar
            </button>
            <button 
              onClick={() => onReject(data.id)}
              className="flex-1 bg-[#C83D3D] text-white py-3 rounded-full font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Reprovar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComprovante;