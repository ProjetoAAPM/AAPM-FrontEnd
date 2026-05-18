import React from "react";
import type { IPagamento } from "../../Services/api";
import "../Scrollbar/scrollbar.css";
import LogoBorda48 from "../../assets/icons/LogoBorda48.svg";
import GaleryIcon from "../../assets/images/galery.svg";

interface ModalProps {
  data: IPagamento;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const CardComprovante: React.FC<ModalProps> = ({
  data,
  onClose,
  onApprove,
  onReject,
}) => {

  const comprovanteUrl = data.comprovante_url;
  const isPDF = comprovanteUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-[3px] p-3 font-['Montserrat']">
      <div className="w-full max-w-[700px] rounded-[14px] overflow-hidden bg-[#0D101A] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

        <div className="h-[75px] bg-[#0D101A] px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LogoBorda48} alt="Logo" className="w-[50px] h-[50px] object-contain" />
            <h3 className="text-white font-bold text-[20px] tracking-tight">Comprovante</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white text-[35px] leading-none font-light hover:opacity-70 transition-opacity pr-2"
          >
            ×
          </button>
        </div>

        <div className="bg-white p-4 sm:p-5 pb-3 rounded-b-[14px] flex flex-col items-center">
          <div className="scroll-modern bg-[#DFF4FF] rounded-[18px] w-full px-6 sm:px-10 pt-6 pb-0 mb-4 relative overflow-y-auto max-h-[380px]">
            <h2 className="text-center font-bold text-[#0B1220] text-[22px] sm:text-[28px] tracking-tight mb-6">
              Comprovante de transação
            </h2>

            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="w-full md:w-auto flex flex-col justify-start min-w-[240px] pb-8">
                <p className="text-[#718096] uppercase font-semibold text-[18px] tracking-[0.05em] mb-6">
                  DADOS DE PAGAMENTO
                </p>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col border-[#BEE3F8]">
                    <p className="text-[#8A97A8] font-bold text-[20px]">Nome</p>
                    <p className="text-[#1A202C] font-bold text-[22px] leading-tight">{data.nome}</p>
                  </div>

                  <div className="flex flex-col border-[#BEE3F8]">
                    <p className="text-[#8A97A8] font-bold text-[20px]">Plano</p>
                    <p className="text-[#1A202C] font-bold text-[22px] leading-tight">{data.plano || "Não informado"}</p>
                  </div>

                  <div className="flex flex-col border-[#BEE3F8]">
                    <p className="text-[#8A97A8] font-bold text-[20px]">Valor</p>
                    <p className="text-[#1A202C] font-bold text-[22px] leading-tight">R${data.valor.toFixed(2).replace(".", ",")}</p>
                  </div>

                  <div className="flex flex-col border-[#BEE3F8]">
                    <p className="text-[#8A97A8] font-bold text-[20px]">Pago em</p>
                    <p className="text-[#1A202C] font-bold text-[22px] leading-tight">{data.data}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:flex-1 flex justify-center md:justify-end">
                <div className="relative w-full max-w-[300px] aspect-[1/1.1] bg-[#3B4A54] rounded-t-[15px] flex items-center justify-center overflow-hidden shadow-xl translate-y-[2px]">
                  {comprovanteUrl ? (
                    isPDF ? (
                      <iframe
                        src={`${comprovanteUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border-0 rounded-t-[15px]"
                        title="Comprovante PDF"
                      />
                    ) : (
                      <img 
                        src={comprovanteUrl} 
                        alt="Comprovante" 
                        className="w-full h-full object-contain bg-white"
                        onError={(e) => { e.currentTarget.src = GaleryIcon; }}
                      />
                    )
                  ) : (
                    <img src={GaleryIcon} alt="Preview" className="w-[70%] h-[70%] object-contain opacity-90" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2">
            <button onClick={() => onApprove(data.id)} className="w-full sm:w-[200px] h-[50px] rounded-full bg-[#63B3ED] text-white font-bold text-[18px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all">
              Aprovar
            </button>

            <button onClick={() => onReject(data.id)} className="w-full sm:w-[200px] h-[50px] rounded-full bg-[#C53030] text-white font-bold text-[18px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all">
              Reprovar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComprovante;