import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlano from "../components/CardPlano";
import Copiador from "../alerts/Copiador";
import { Copy, ArrowLeft } from "lucide-react";
import ConfirmarPagamento from "../alerts/ConfirmarPagamento";
import Alert from "../alerts/Alert";
import logo48 from "../assets/icons/Logo48.svg"
import qrcode from "../assets/images/qrcode.png"

function EscolhaPlano() {
    const navigate = useNavigate();
    const [comprovanteComum, setComprovanteComum] = useState<File | null>(null);
    const [comprovantePremium, setComprovantePremium] = useState<File | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState<"comum" | "premium" | null>(null);

    const [alerta, setAlerta] = useState({
        aberto: false,
        tipo: "sucesso" as "sucesso" | "erro",
        titulo: "",
        descricao: "",
    });

    const dispararAlerta = (tipoAlerta: "sucesso" | "erro", titulo: string, descricao: string) => {
        setAlerta({ aberto: true, tipo: tipoAlerta, titulo, descricao });
    }

    const handlPrepararEnvio = (plano: "comum" | "premium", comprovante: File | null) => {
        if (!comprovante) {
            dispararAlerta("erro", "Arquivo Ausente", "Por favor, adicione o comprovante do Pix primeiro!");
            return;
        }
        setPlanoSelecionado(plano);
        setModalAberto(true);
    };

    const handleConfirmarEnvio = async () => {
        const comprovante = planoSelecionado === "premium" ? comprovantePremium : comprovanteComum;
        if (!comprovante) {
            dispararAlerta("erro", "Arquivo Ausente", "Por favor, selecione um arquivo de comprovante primeiro.");
            return;
        }
        const idUsuarioSalvo = localStorage.getItem("usuario_id");
        if (!idUsuarioSalvo) {
            dispararAlerta("erro", "Erro Crítico", "O ID do usuário não foi encontrado!");
            return;
        }
        const dadosPagamento = {
            usuario_id: Number(idUsuarioSalvo),
            plano: planoSelecionado,
            valor: planoSelecionado === "premium" ? 100.00 : 50.00
        };

        try {
            setLoading(true);
            const respostaEtapa1 = await fetch("https://aapm-api.onrender.com/pagamento/gerar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(dadosPagamento),
            });
            
            const resultadoEtapa1 = await respostaEtapa1.json();
            if (!respostaEtapa1.ok) {
                const mensagemErro = resultadoEtapa1.erro || resultadoEtapa1.mensagem || "Falha na operação.";
                dispararAlerta("erro", "Erro na Geração", mensagemErro);
                setModalAberto(false);
                setPlanoSelecionado(null);
                return;
            }

            const idPagamento = resultadoEtapa1.id_pagamento;
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

            if (respostaEtapa2.ok) {
                setModalAberto(false);
                setPlanoSelecionado(null);

                if (planoSelecionado === "premium") {
                    setComprovantePremium(null);
                } else {
                    setComprovanteComum(null);
                }

                dispararAlerta("sucesso", "Sucesso!", resultadoEtapa2.mensagem || "Comprovante enviado com sucesso! Aguarde a validação.");

                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            } else {
                const mensagemErro = resultadoEtapa2.erro || resultadoEtapa2.mensagem || "Falha na operação.";
                dispararAlerta("erro", "Erro no Envio", mensagemErro);
                setModalAberto(false);
                setPlanoSelecionado(null);
            }
        } catch (erro) {
            console.error("Erro na requisição de pagamento:", erro);
            dispararAlerta("erro", "Falha de Conexão", "Não foi possível conectar ao servidor.");
            setModalAberto(false);
            setPlanoSelecionado(null);
        } finally {
            setLoading(false);
        }
    };

    const fecharModal = () => {
        if (!loading) {
            setModalAberto(false);
            setPlanoSelecionado(null);
        }
    };

    return (
        <div className="min-h-[100vh] bg-[#101625] flex flex-col items-center py-5">

            <Alert
                aberto={alerta.aberto}
                tipo={alerta.tipo}
                titulo={alerta.titulo}
                descricao={alerta.descricao}
                fechar={() => setAlerta((prev) => ({ ...prev, aberto: false }))}
            />

            {modalAberto && planoSelecionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <ConfirmarPagamento 
                        plano={planoSelecionado} 
                        onConfirmar={handleConfirmarEnvio} 
                        onCancelar={fecharModal} 
                        isLoading={loading} 
                    />
                </div>
            )}
            <div className="w-full max-w-5xl mb-5">
                <div className="flex justify-center mb-30">
                    <img src={logo48} alt="logo" className="absolute lg:-mt-0.5 h-[70px] md:h-[80px] lg:h-[100px] w-auto drop-shadow-md" />
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="hidden lg:flex absolute top-10 left-15 flex items-center gap-2 cursor-pointer"
                >
                    <ArrowLeft size={30} color="#FFFFFF" strokeWidth={3}/>
                </button>

                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#42B9F4] py-4 -mt-8 -mb-4 md:-mt-5 md:mb-2 lg:-mt-1 lg:mb-3 lg:h-[80px]">
                    <h1 className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold italic">Escolha o seu plano</h1>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 w-full mb-15 justify-between">
                <CardPlano
                    titulo="Plano Comum"
                    className="bg-[#86D5FE]"
                    fundoTitulo="bg-white mr-10 mt-8 md:mr-12.5 md:mt-9 lg:mr-10.5 lg:mt-10 w-[85%] lg:w-[90%] h-[40px] rounded-r-xs"
                    popular={false}
                    textoBtn={loading && planoSelecionado === "comum" ? "Enviando..." : "Upload"}
                    corBtn="bg-[#373737] text-white"
                    onClick={() => handlPrepararEnvio("comum", comprovanteComum)}
                >
                    <img src={qrcode} alt="qrcode" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[187px] lg:h-[187px] rounded-2xl" />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#78C0E5] p-2 mt-3 rounded-lg flex items-center justify-between border-2 border-[#78C0E5] shadow-md cursor-pointer">
                            <div className="text-left overflow-hidden">
                                <p className="text-[10px] md:text-sm font-medium">Chave Pix</p>
                                <p className="text-xs md:text-base font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                            </div>
                            <Copy size={16} className="text-gray-600 flex-shrink-0 ml-2" />
                        </div>
                    </Copiador>
                    <label
                        className="w-[90%] max-w-[300px] min-h-[120px] lg:max-w-[400px] lg:min-h-[160px] mt-3 mb-3 rounded-sm bg-[#F5F5F5] flex flex-col items-center justify-center cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) { setComprovanteComum(file); }
                        }}
                    >
                        <input type="file" className="hidden" onChange={(e) => setComprovanteComum(e.target.files?.[0] || null)} />
                        <p className="text-xs md:text-sm lg:text-base font-semibold text-[#888888]">{comprovanteComum ? comprovanteComum.name : "Arraste o arquivo até aqui!"}</p>
                    </label>
                </CardPlano>

                <div className="hidden lg:block w-[3px] h-30 mr-3 flex self-center rounded bg-[#969696]"></div>

                <CardPlano
                    titulo="Plano Premium"
                    className="bg-[#1D1D1D] border-4 border-[#F0C41B]"
                    fundoTitulo="bg-white ml-10 mt-8 md:ml-12.5 md:mt-9 lg:ml-10.5 lg:mt-10 w-[85%] lg:w-[90%] h-[40px] rounded-l-xs"
                    popular={true}
                    textoBtn={loading && planoSelecionado === "premium" ? "Enviando..." : "Upload"}
                    corBtn="bg-[#86D5FE]"
                    onClick={() => handlPrepararEnvio("premium", comprovantePremium)}
                >
                    <img src={qrcode} alt="qrcode" className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[187px] lg:h-[187px] rounded-2xl" />
                    <Copiador textoParaCopiar="https://www.sp.senai.br/">
                        <div className="w-full max-w-[260px] md:max-w-[299px] h-[50px] bg-[#424242] p-2 mt-3 rounded-lg flex items-center justify-between shadow-md cursor-pointer">
                            <div className="text-left overflow-hidden">
                                <p className="text-[10px] md:text-sm font-medium text-[#F0C72B]">Chave Pix</p>
                                <p className="text-xs md:text-base font-semibold text-[#FFFFFF] truncate">https://www.sp.senai.br/</p>
                            </div>
                            <Copy size={16} className="text-[#F0C72B] flex-shrink-0 ml-2" />
                        </div>
                    </Copiador>
                    <label
                        className="w-[90%] max-w-[300px] min-h-[120px] lg:max-w-[400px] lg:min-h-[160px] mt-3 mb-3 rounded-sm bg-[#F5F5F5] flex flex-col items-center justify-center p-2 cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) { setComprovantePremium(file); }
                        }}
                    >
                        <input type="file" className="hidden" onChange={(e) => setComprovantePremium(e.target.files?.[0] || null)} />
                        <p className="text-xs md:text-sm lg:text-base font-semibold text-[#888888]">{comprovantePremium ? comprovantePremium.name : "Arraste o arquivo até aqui!"}</p>
                    </label>
                </CardPlano>
            </div>
        </div>
    );
}

export default EscolhaPlano;