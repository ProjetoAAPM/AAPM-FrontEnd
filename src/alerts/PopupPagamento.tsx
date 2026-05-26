import { useState } from "react";
import Copiador from "../alerts/Copiador";
import { Copy, X, Loader2 } from "lucide-react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  planoSelecionado: "comum" | "premium" | "turbinar";
}

function PopupPagamento({ isOpen, onClose, planoSelecionado }: PopupProps) {
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmar = async () => {
    if (!comprovante) {
      alert("Por favor, anexe o comprovante antes de continuar.");
      return;
    }

    const formData = new FormData();
    formData.append("comprovante", comprovante);
    formData.append("plano", planoSelecionado);
    
    const valor = planoSelecionado === "premium" ? 100 : planoSelecionado === "turbinar" ? 80 : 50;
    formData.append("valor", String(valor));

    try {
      setLoading(true);

      const resposta = await fetch("http://localhost:5000/usuario/pagamento/enviar", {
        method: "POST",
        credentials: "include", 
        body: formData,
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || resultado.mensagem || "Falha ao processar pagamento.");
      }

      alert(resultado.mensagem || "Comprovante enviado com sucesso! Aguarde a validação.");
      setComprovante(null);
      onClose();
    } catch (erro: any) {
      console.error("Erro no fluxo de pagamento:", erro);
      alert(erro.message || "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[435px] bg-white rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-full h-[60px] bg-gradient-to-r from-[#86D5FE]/50 via-[#C83D3D]/50 to-[#EFC00B]/50" />

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        <div className="p-8 flex flex-col items-center">
          <img
            src="src/assets/images/qrcode.png"
            alt="Código QR para Pagamento Pix"
            className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] rounded-2xl border-2 border-[#383636]/50 object-cover"
          />

          <Copiador textoParaCopiar="https://www.sp.senai.br/">
            <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#FFEBEB] p-2 mt-4 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer hover:bg-[#ffdada] transition-colors">
              <div className="text-left overflow-hidden pr-2">
                <p className="text-xs font-medium text-gray-600">Chave Pix</p>
                <p className="text-sm font-semibold text-[#C83D3D] truncate">
                  https://www.sp.senai.br/
                </p>
              </div>
              <Copy size={16} className="text-gray-600 flex-shrink-0" />
            </div>
          </Copiador>

          <label
            className="w-full h-28 mt-4 rounded-xl bg-[#F5F5F5] flex flex-col items-center justify-center p-4 cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#C83D3D] hover:bg-gray-50 transition-all text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) setComprovante(file);
            }}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*,application/pdf"
              onChange={(e) => setComprovante(e.target.files?.[0] || null)}
            />
            <p className="text-sm font-semibold text-gray-500 max-w-[240px] truncate">
              {comprovante ? comprovante.name : "Arraste ou clique para anexar o comprovante"}
            </p>
          </label>

          <button
            onClick={handleConfirmar}
            disabled={loading}
            className="w-full max-w-[180px] h-[50px] mt-5 rounded-xl text-white font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-70 transition-all text-xl cursor-pointer bg-[#373737] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Enviando...</span>
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupPagamento;