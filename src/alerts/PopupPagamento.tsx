import { useState } from "react";
import Copiador from "../alerts/Copiador";
import { Copy } from "lucide-react";
import { X } from "lucide-react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    planoSelecionado: "comum" |"premium" | "turbinar";
}

function PopupPagamento({ isOpen, onClose, planoSelecionado }: PopupProps) {
    const [comprovante, setComprovante] = useState<File | null>(null);

    if (!isOpen) return null;

    const handleConfirmar = async () => {
        if (!comprovante) {
            alert("Anexe o comprovante primeiro!");
            return;
        }

        const idUsuarioSalvo = localStorage.getItem('usuario_id');

        if (!idUsuarioSalvo) {
            alert("Erro crítico: O ID do usuário não foi encontrado na memória do navegador! Refaça o cadastro.");
            return;
        }

        const dadosPagamento = {
            usuario_id: Number(idUsuarioSalvo),
            plano: planoSelecionado,
            valor: planoSelecionado === "premium" ? 100.00 : planoSelecionado === "turbinar" ? 80.00 : 50.00
        };

        try {
            const respostaEtapa1 = await fetch("http://localhost:5000/usuario/pagamento/gerar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(dadosPagamento),
            });

            const resultadoEtapa1 = await respostaEtapa1.json();

            if (!respostaEtapa1.ok) {
                const mensagemErro = resultadoEtapa1.erro || resultadoEtapa1.mensagem || "Falha na operação.";
                alert(`Erro: ${mensagemErro}`);
                onClose();
                return;
            }

            const idPagamento = resultadoEtapa1.id_pagamento;

            const formData = new FormData();


            formData.append("id_pagamento", String(idPagamento));
            formData.append("comprovante", comprovante);

                const respostaEtapa2 = await fetch(
                    "http://localhost:5000/pagamento/enviar-comprovante",
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    }
                );

            const resultadoEtapa2 = await respostaEtapa2.json();

            if (respostaEtapa2.ok) {
                alert(resultadoEtapa2.mensagem || "Comprovante enviado com sucesso!");
                
                setComprovante(null);
                onClose();
            } else {
                const mensagemErro = resultadoEtapa2.erro || resultadoEtapa2.mensagem || "Falha na operação.";
                alert(`Erro: ${mensagemErro}`);
                onClose();
            }
        } catch (erro) {
            console.error("Erro na requisição de pagamento:", erro);
            alert("Não foi possível conectar ao servidor. Certifique-se de que o Flask está ativo.");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            
            <div className="relative w-full max-w-[320px] md:max-w-[360px] lg:max-w-[435px] bg-white rounded-2xl overflow-hidden shadow-xl">

                <div className="w-full h-[55px] lg:h-[60px] bg-gradient-to-r from-[#86D5FE]/50 via-[#C83D3D]/50 to-[#EFC00B]/50" />

                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-white font-bold text-3xl cursor-pointer"
                >
                    <X size={28} strokeWidth={2.5} className="mt-2" />
                </button>

                <div className="p-8 flex flex-col items-center">

                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[187px] lg:h-[187px] rounded-2xl border-2 border-[#383636]/50"
                    />

                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] md:max-w-[280px] h-[50px] bg-[#FFEBEB] p-2 mt-3 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer">
                            <div className="text-left overflow-hidden">
                                <p className="text-[10px] md:text-sm font-medium">Chave Pix</p>
                                <p className="text-xs md:text-base font-semibold text-[#C83D3D] truncate">https://www.sp.senai.br/</p>
                            </div>
                            <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                        </div>
                    </Copiador>

                    <label className={`w-[90%] max-w-[290px] min-h-[100px] md:max-w-[300px] md:min-h-[120px] lg:max-w-[400px] lg:min-h-[140px] mt-3 rounded-md bg-[#F5F5F5] flex flex-col items-center justify-center p-2 cursor-pointer border-2 border-[#383636]/50`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) setComprovante(file);
                        }}
                    >
                        <input type="file" className="hidden" onChange={(e) => setComprovante(e.target.files?.[0] || null)} />

                        <p className="text-xs md:text-sm lg:text-base font-semibold text-[#888888]">
                            {comprovante ? comprovante.name : "Arraste o arquivo até aqui!"}
                        </p>
                    </label>

                    <button 
                        onClick={handleConfirmar}
                        className="w-full max-w-[140px] md:max-w-[160px] lg:max-w-[180px] 
                            mx-auto h-[40px] md:h-[48px] lg:h-[54px] 
                            mt-4 rounded-xl text-lg md:text-xl lg:text-2xl 
                            text-white font-bold 
                            shadow-md hover:scale-105 
                            active:scale-95 transtion-all 
                            cursor-pointer bg-[#373737]">
                        Upload
                    </button>

                </div>
            </div>
        </div>
    );
}

export default PopupPagamento;