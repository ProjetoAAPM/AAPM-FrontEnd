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
    const fecharModal = () => { setModalAberto(false); setPlanoSelecionado(null);};
    const [planoSelecionado, setPlanoSelecionado] = useState<"comum" | "premium" | null>(null);

    const handlPrepararEnvio = (plano: "comum" | "premium", comprovante: File | null) => {
        if (!comprovante) {
            alert("Coloque o comprovante primeiro!");
            return;
        }
        setPlanoSelecionado(plano);
        setModalAberto(true);
    }

    const handleConfirmarEnvio = async () => {
        const comprovante = planoSelecionado === "premium" ? comprovantePremium : comprovanteComum;

        if (!comprovante) {
            alert("Por favor, selecione um arquivo de comprovante primeiro.");
            return;
        }

        const dadosPagamento = {
            plano: planoSelecionado,
            valor: planoSelecionado === "premium" ? 100.00 : 50.00
        };

        try {
            const respostaEtapa1 = await fetch("http://localhost:5000/pagamento/gerar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosPagamento),
            });

            const resultadoEtapa1 = await respostaEtapa1.json();

            if (!respostaEtapa1.ok) {
                const mensagemErro = resultadoEtapa1.erro || resultadoEtapa1.mensagem || "Falha na operação.";
                alert(`Erro: ${mensagemErro}`);
                fecharModal();
                return;
            }

            const idPagamento = resultadoEtapa1.id_pagamento;

            const urlImagem = URL.createObjectURL(comprovante);

            const respostaEtapa2 = await fetch("http://localhost:5000/pagamento/enviar-comprovante", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_pagamento: idPagamento,
                    url_imagem: urlImagem
                }),
            });

            const resultadoEtapa2 = await respostaEtapa2.json();

            if (respostaEtapa2.ok) {
                alert(resultadoEtapa2.mensagem || "Comprovante enviado com sucesso!");

                if (planoSelecionado === "premium") setComprovantePremium(null);
                else setComprovanteComum(null);

                fecharModal();
                navigate("/login");
            } else {
                const mensagemErro = resultadoEtapa2.erro || resultadoEtapa2.mensagem || "Falha na operação.";
                alert(`Erro: ${mensagemErro}`);
                fecharModal();
            }
        } catch (erro) {
            console.error("Erro na requisição de pagamento:", erro);
            alert("Não foi possível conectar ao servidor. Certifique-se de que o Flask está ativo.");
            fecharModal();
        }
    };

    return(
        <div className="min-h-[100vh] bg-[#101625] flex flex-col items-center py-5 ">

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
                     <img src="src/assets/icons/Logo48.svg" alt="logo" className="absolute h-[100px] w-auto drop-shadow-md"/>
                </div>
                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#42B9F4] py-4 mb-3 h-[80px]">
                    <h1 className="text-white text-center text-4xl font-bold italic">
                        Escolha o seu plano
                    </h1>
                </div>
                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#42B9F4] py-4 mb-3 h-[80px]">
                    <h1 className="text-white text-center text-4xl font-bold italic">
                        Escolha o seu plano
                    </h1>
                </div>
           </div>

           <div className="flex flex-wrap justify-center gap-8 w-full mb-15 justify-between">
           <div className="flex flex-wrap justify-center gap-8 w-full mb-15 justify-between">
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#86D5FE]"
                    fundoTitulo="bg-white mr-10.5 mt-10 w-[90%] h-[40px] rounded-r-xs"
                    className="bg-[#86D5FE]"
                    fundoTitulo="bg-white mr-10.5 mt-10 w-[90%] h-[40px] rounded-r-xs"
                    popular={false}
                    textoBtn="Upload"
                    textoBtn="Upload"
                    corBtn="bg-[#373737] text-white"
                    onClick={() => handlPrepararEnvio("comum", comprovanteComum)}
                > 
                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px] rounded-2xl " />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                            <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#78C0E5] p-2 mt-3 rounded-lg flex items-center justify-between border-2 border-[#78C0E5] shadow-md cursor-pointer">
                                <div className="text-left overflow-hidden">
                                    <p className="text-xs md:text-xs font-medium">Chave Pix</p>
                                    <p className="text-sm md:text-sm font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                                </div>
                                <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                            </div>
                        </Copiador>

                        <label className={`w-[90%] max-w-[400px] min-h-[160px] mt-3 rounded-sm bg-[#F5F5F5] flex flex-col items-center justify-center cursor-pointer`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) setComprovanteComum(file);
                            }}
                        >
                            <input type="file" className="hidden" onChange={(e) => setComprovanteComum(e.target.files?.[0] || null)} />

                            <p className="text-base font-semibold text-[#888888]">
                                {comprovanteComum ? comprovanteComum.name : "Arraste o arquivo até aqui!"}
                            </p>

                        </label>
                </CardPlano>

                <div className="hidden lg:block w-[3px] h-30 mr-3 flex self-center rounded bg-[#969696]"></div>

                <div className="hidden lg:block w-[3px] h-30 mr-3 flex self-center rounded bg-[#969696]"></div>

                <CardPlano
                    titulo="Plano Premium"
                    className="bg-[#1D1D1D] border-4 border-[#F0C41B]"
                    fundoTitulo="bg-white ml-10.5 mt-10 w-[90%] h-[40px] rounded-l-xs"
                    className="bg-[#1D1D1D] border-4 border-[#F0C41B]"
                    fundoTitulo="bg-white ml-10.5 mt-10 w-[90%] h-[40px] rounded-l-xs"
                    popular={true}
                    textoBtn="Upload"
                    textoBtn="Upload"
                    corBtn="bg-[#86D5FE]"
                    onClick={() => handlPrepararEnvio("premium", comprovantePremium)}
                > 
                    <img src="src/assets/images/qrcode.png" alt="qrcode" className="w-[120px] h-[120px] md:w-[187px] md:h-[187px]  rounded-2xl " />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                            <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#424242] p-2 mt-3 rounded-lg flex items-center justify-between shadow-md cursor-pointer">
                                <div className="text-left overflow-hidden">
                                    <p className="text-xs md:text-xs font-medium text-[#F0C72B]">Chave Pix</p>
                                    <p className="text-sm md:text-sm font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                                </div>
                                <Copy size={16} className="text-[#F0C72B] flex-shrink-0 ml-2" />
                            </div>
                        </Copiador>

                        <label className={`w-[90%] max-w-[400px] h-40 mt-3 mb-3 rounded-sm bg-[#F5F5F5] flex flex-col items-center justify-center p-2 cursor-pointer`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) setComprovantePremium(file);
                            }}
                        >
                            <input type="file" className="hidden" onChange={(e) => setComprovantePremium(e.target.files?.[0] || null)} />

                            <p className="text-base font-semibold text-[#888888]">
                                {comprovantePremium ? comprovantePremium.name : "Arraste o arquivo até aqui!"}
                            </p>

                        </label>
                </CardPlano>


           </div>

        </div>
    );
}
export default EscolhaPlano;