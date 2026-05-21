import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlano from "../components/CardPlano";
import Copiador from "../alerts/Copiador";
import { Copy } from "lucide-react";
import ConfirmarPagamento from "../alerts/ConfirmarPagamento";

function EscolhaPlano() {
    const navigate = useNavigate();

    const [comprovanteComum, setComprovanteComum] = useState<File | null>(null);
    const [comprovantePremium, setComprovantePremium] = useState<File | null>(null);

    const [modalAberto, setModalAberto] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] =
        useState<"comum" | "premium" | null>(null);

    function fecharModal() {
        setModalAberto(false);
        setPlanoSelecionado(null);
    }

    function prepararEnvio(plano: "comum" | "premium", comprovante: File | null) {
        if (!comprovante) {
            alert("Coloque o comprovante primeiro!");
            return;
        }

        setPlanoSelecionado(plano);
        setModalAberto(true);
    }

    async function handleConfirmarEnvio() {
        const comprovante =
            planoSelecionado === "premium"
                ? comprovantePremium
                : comprovanteComum;

        if (!comprovante) {
            alert("Por favor, selecione o comprovante.");
            return;
        }

        const dadosPagamento = {
            plano: planoSelecionado,
            valor: planoSelecionado === "premium" ? 50 : 25
        };

        try {
            const etapa1 = await fetch("http://localhost:5000/pagamento/gerar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosPagamento),
            });

            const json1 = await etapa1.json();

            if (!etapa1.ok) {
                alert(json1.erro || "Erro ao gerar pagamento");
                fecharModal();
                return;
            }

            const idPagamento = json1.id_pagamento;

            const urlImagem = URL.createObjectURL(comprovante);

            const etapa2 = await fetch(
                "http://localhost:5000/pagamento/enviar-comprovante",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_pagamento: idPagamento,
                        url_imagem: urlImagem
                    }),
                }
            );

            const json2 = await etapa2.json();

            if (etapa2.ok) {
                alert(json2.mensagem || "Pagamento enviado!");

                if (planoSelecionado === "premium") {
                    setComprovantePremium(null);
                } else {
                    setComprovanteComum(null);
                }

                fecharModal();
                navigate("/login");
            } else {
                alert(json2.erro || "Erro no envio");
                fecharModal();
            }

        } catch (err) {
            console.error(err);
            alert("Erro de conexão com servidor");
            fecharModal();
        }
    }

    return (
        <div className="min-h-[100vh] bg-[#101625] flex flex-col items-center py-5">

            {modalAberto && planoSelecionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <ConfirmarPagamento
                        plano={planoSelecionado}
                        onConfirmar={handleConfirmarEnvio}
                        onCancelar={fecharModal}
                    />
                </div>
            )}

            <div className="w-full max-w-5xl mb-5">
                <div className="flex justify-center mb-30">
                    <img
                        src="src/assets/icons/Logo48.svg"
                        className="absolute h-[100px]"
                    />
                </div>

                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#42B9F4] py-4 mb-3 h-[80px]">
                    <h1 className="text-white text-center text-4xl font-bold italic">
                        Escolha o seu plano
                    </h1>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 w-full mb-15">

                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#86D5FE]"
                    fundoTitulo="bg-white mt-10 w-[90%] h-[40px]"
                    popular={false}
                    textoBtn="Upload"
                    corBtn="bg-[#373737] text-white"
                    onClick={() => prepararEnvio("comum", comprovanteComum)}
                >
                    <img
                        src="src/assets/images/qrcode.png"
                        className="w-[120px] md:w-[187px]"
                    />

                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] h-[50px] bg-[#78C0E5] p-2 mt-3 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="text-xs">Chave Pix</p>
                                <p className="text-sm font-semibold truncate">
                                    https://www.sp.senai.br/
                                </p>
                            </div>
                            <Copy size={16} />
                        </div>
                    </Copiador>

                    <label className="w-[90%] max-w-[400px] min-h-[160px] mt-3 bg-[#F5F5F5] flex items-center justify-center cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                setComprovanteComum(e.target.files?.[0] || null)
                            }
                        />
                        <p className="text-gray-500 text-center">
                            {comprovanteComum
                                ? comprovanteComum.name
                                : "Arraste o arquivo"}
                        </p>
                    </label>
                </CardPlano>

                <CardPlano
                    titulo="Plano Premium"
                    className="bg-[#1D1D1D] border-4 border-[#F0C41B]"
                    fundoTitulo="bg-white mt-10 w-[90%] h-[40px]"
                    popular={true}
                    textoBtn="Upload"
                    corBtn="bg-[#86D5FE]"
                    onClick={() => prepararEnvio("premium", comprovantePremium)}
                >
                    <img
                        src="src/assets/images/qrcode.png"
                        className="w-[120px] md:w-[187px]"
                    />

                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] h-[50px] bg-[#424242] p-2 mt-3 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#F0C72B]">Chave Pix</p>
                                <p className="text-sm text-white truncate">
                                    https://www.sp.senai.br/
                                </p>
                            </div>
                            <Copy size={16} className="text-[#F0C72B]" />
                        </div>
                    </Copiador>

                    <label className="w-[90%] max-w-[400px] min-h-[160px] mt-3 bg-[#F5F5F5] flex items-center justify-center cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                setComprovantePremium(e.target.files?.[0] || null)
                            }
                        />
                        <p className="text-gray-500 text-center">
                            {comprovantePremium
                                ? comprovantePremium.name
                                : "Arraste o arquivo"}
                        </p>
                    </label>
                </CardPlano>
            </div>
        </div>
    );
}

export default EscolhaPlano;