import { useState, useEffect } from "react";
import Copiador from "../alerts/Copiador";
import { Copy, X, Loader2 } from "lucide-react";
import Alert from "../alerts/Alert";
import qrcode from "../assets/images/qrcode.png"

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  planoSelecionado: "comum" | "premium" | "turbinar";
}

function PopupPagamento({ isOpen, onClose, planoSelecionado }: PopupProps) {
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [alerta, setAlerta] = useState({
    aberto: false,
    tipo: "sucesso" as "sucesso" | "erro",
    titulo: "",
    descricao: "",
  });

  useEffect(() => {
    setComprovante(null);
  }, [planoSelecionado, isOpen]);

  const dispararAlerta = (tipoAlerta: "sucesso" | "erro", titulo: string, descricao: string) => {
    setAlerta({ aberto: true, tipo: tipoAlerta, titulo, descricao });
  };
  if (!isOpen && !alerta.aberto) return null;

  const handleConfirmar = async () => {
    if (!comprovante) {
      dispararAlerta("erro", "Arquivo Ausente", "Por favor, anexe o comprovante antes de continuar.");
      return;
    }

    const idUsuarioSalvo = localStorage.getItem("usuario_id");
    if (!idUsuarioSalvo) {
      dispararAlerta("erro", "Erro Crítico", "O ID do usuário não foi encontrado na memória do navegador!");
      return;
    }

    const valor =
      planoSelecionado === "premium"
        ? 100.0
        : planoSelecionado === "turbinar"
        ? 80.0
        : 50.0;

    try {
      setLoading(true);

      const respostaEtapa1 = await fetch(
        "https://aapm-api.onrender.com/usuario/pagamento/gerar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            usuario_id: Number(idUsuarioSalvo),
            plano: planoSelecionado,
            valor: valor,
          }),
        }
      );

      const resultadoEtapa1 = await respostaEtapa1.json();

      if (!respostaEtapa1.ok) {
        throw new Error(
          resultadoEtapa1.erro ||
            resultadoEtapa1.mensagem ||
            "Falha ao gerar pagamento."
        );
      }

      const idPagamento = resultadoEtapa1.id_pagamento;
      if (!idPagamento) {
        throw new Error("Pagamento criado sem ID.");
      }

      const formData = new FormData();
      formData.append("id_pagamento", String(idPagamento));
      formData.append("comprovante", comprovante);

      const respostaEtapa2 = await fetch(
        "https://aapm-api.onrender.com/pagamento/enviar-comprovante",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const resultadoEtapa2 = await respostaEtapa2.json();

      if (!respostaEtapa2.ok) {
        throw new Error(
          resultadoEtapa2.erro ||
            resultadoEtapa2.mensagem ||
            "Falha ao enviar comprovante."
        );
      }

      setComprovante(null);
      
      onClose();

      dispararAlerta("sucesso", "Sucesso!", resultadoEtapa2.mensagem || "Comprovante enviado com sucesso!");
      
    } catch (erro: any) {
      console.error("Erro no fluxo de pagamento:", erro);
      dispararAlerta(
        "erro",
        "Falha no Envio",
        erro.message || "Não foi possível conectar ao servidor. Certifique-se de que o Flask está ativo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert
        aberto={alerta.aberto}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
        fechar={() => setAlerta((prev) => ({ ...prev, aberto: false }))}
      />

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-[320px] md:max-w-[360px] lg:max-w-[435px] bg-white rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-full h-[55px] lg:h-[60px] bg-gradient-to-r from-[#86D5FE]/50 via-[#C83D3D]/50 to-[#EFC00B]/50" />

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        <div className="p-6 md:p-8 flex flex-col items-center">
          <img
            src={qrcode}
            alt="Código QR para pagamento Pix"
            className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[187px] lg:h-[187px] rounded-2xl border-2 border-[#383636]/50 object-cover"
          />

              <Copiador textoParaCopiar="https://www.sp.senai.br/">
                <div className="w-full max-w-[260px] md:max-w-[280px] lg:max-w-[299px] h-[50px] bg-[#FFEBEB] p-2 mt-4 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer hover:bg-[#ffdada] transition-colors">
                  <div className="text-left overflow-hidden pr-2">
                    <p className="text-[10px] md:text-sm font-medium text-gray-600">
                      Chave Pix
                    </p>
                    <p className="text-xs md:text-base font-semibold text-[#C83D3D] truncate">
                      https://www.sp.senai.br/
                    </p>
                  </div>
                  <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                </div>
              </Copiador>

              <label
                className="w-[90%] max-w-[290px] min-h-[100px] md:max-w-[300px] md:min-h-[120px] lg:max-w-[400px] lg:min-h-[140px] mt-4 rounded-xl bg-[#F5F5F5] flex flex-col items-center justify-center p-4 cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#C83D3D] hover:bg-gray-50 transition-all text-center"
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
                <p className="text-xs md:text-sm lg:text-base font-semibold text-gray-500 max-w-[240px] md:max-w-[280px] break-words">
                  {comprovante ? comprovante.name : "Arraste ou clique para anexar o comprovante"}
                </p>
              </label>

              <button
                onClick={handleConfirmar}
                disabled={loading}
                className="w-full max-w-[140px] md:max-w-[160px] lg:max-w-[180px] h-[40px] md:h-[48px] lg:h-[54px] mt-5 rounded-xl text-lg md:text-xl lg:text-2xl text-white font-bold shadow-md hover:scale-[1.03] active:scale-[0.97] disabled:scale-100 disabled:opacity-70 transition-all cursor-pointer bg-[#373737] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span className="text-sm md:text-base">Enviando...</span>
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupPagamento;