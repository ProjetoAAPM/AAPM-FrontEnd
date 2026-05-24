import { useState } from "react";
import Copiador from "../alerts/Copiador";
import { Copy, X } from "lucide-react";
import { supabase } from "../Services/admin/supabaseClient";
import { pagamentoUserService } from "../Services/payments/pagamentoUserService";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

function PopupPagamento({ isOpen, onClose }: PopupProps) {
    const [comprovante, setComprovante] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleConfirmar = async () => {
        if (!comprovante) {
            alert("Anexe o comprovante primeiro!");
            return;
        }

        try {
            setLoading(true);
            const usuario_id = localStorage.getItem("usuario_id");

            const resultadoPagamento = await pagamentoUserService.gerarPagamento({
                usuario_id: usuario_id ? Number(usuario_id) : null,
                plano: "premium",
                valor: 80
            });

            const nomeArquivo = `${Date.now()}-${comprovante.name}`;

            const { error } = await supabase.storage
                .from("fotos_tcc")
                .upload(nomeArquivo, comprovante);

            if (error) {
                throw new Error("Erro ao enviar imagem.");
            }

            const { data } = supabase.storage
                .from("fotos_tcc")
                .getPublicUrl(nomeArquivo);

            const urlImagem = data.publicUrl;

            await pagamentoUserService.enviarComprovante({
                id_pagamento: resultadoPagamento.id_pagamento,
                url_imagem: urlImagem
            });

            alert("Comprovante enviado!");
            setComprovante(null);
            onClose();
        } catch (erro: any) {
            console.error(erro);
            alert(erro.message || "Erro ao enviar comprovante.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-[435px] bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-[60px] bg-gradient-to-r from-[#86D5FE]/50 via-[#C83D3D]/50 to-[#EFC00B]/50" />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-white font-bold text-3xl cursor-pointer"
                >
                    <X
                        size={28}
                        strokeWidth={2.5}
                        className="mt-2"
                    />
                </button>

                <div className="p-8 flex flex-col items-center">
                    <img
                        src="src/assets/images/qrcode.png"
                        alt="qrcode"
                        className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] rounded-2xl border-2 border-[#383636]/50"
                    />

                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#FFEBEB] p-2 mt-3 rounded-lg flex items-center justify-between border-2 border-[#EFD0D0] shadow-md cursor-pointer">
                            <div className="text-left overflow-hidden">
                                <p className="text-xs md:text-xs font-medium">Chave Pix</p>
                                <p className="text-sm md:text-sm font-semibold text-[#C83D3D] truncate">https://www.sp.senai.br/</p>
                            </div>
                            <Copy
                                size={16}
                                className="text-gray-600 flex-shrink-0 ml-2"
                            />
                        </div>
                    </Copiador>

                    <label
                        className="w-full h-30 mt-3 rounded-md bg-[#F5F5F5] flex flex-col items-center justify-center p-2 cursor-pointer border-2 border-[#383636]/50"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) {
                                setComprovante(file);
                            }
                        }}
                    >
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setComprovante(e.target.files?.[0] || null)}
                        />
                        <p className="text-base font-semibold text-[#888888]">
                            {comprovante ? comprovante.name : "Arraste o arquivo até aqui!"}
                        </p>
                    </label>

                    <button
                        onClick={handleConfirmar}
                        disabled={loading}
                        className="w-full max-w-[180px] mx-auto h-[54px] mt-4 rounded-xl text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-2xl cursor-pointer bg-[#373737]"
                    >
                        {loading ? "Enviando..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupPagamento;