import { useEffect, useState } from "react";
import SugestaoCard from "./admin/SugestaoCard";
import LayoutAviso from "../../alerts/LayoutAviso";
import "../Scrollbar/scrollbar.css";
import filtroIcon from "../../assets/icons/icone_filtro.svg";
import { sugestaoService, type ISugestao } from "../../Services/sugestaoService";

interface SugestoesProps {
  modoAdmin?: boolean;
}

type TipoFiltro = "Todos" | "Pendentes" | "Aprovados" | "Reprovados";

export default function Sugestoes({ modoAdmin = false }: SugestoesProps) {
  const [texto, setTexto] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [listaSugestoes, setListaSugestoes] = useState<ISugestao[]>([]);
  const [filtro, setFiltro] = useState<TipoFiltro>("Todos");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const carregarSugestoes = async () => {
    if (!modoAdmin) return;
    setLoading(true);
    setError(null);
    try {
      const data = await sugestaoService.listarSugestoes();
      setListaSugestoes(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar sugestões");
      setListaSugestoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modoAdmin) {
      carregarSugestoes();
      const interval = setInterval(carregarSugestoes, 8000);
      return () => clearInterval(interval);
    }
  }, [modoAdmin]);

  const enviarSugestao = async () => {
    if (!texto.trim() || isSending) return;

    setIsSending(true);
    try {
      await sugestaoService.enviarSugestao(texto);
      setTexto("");
      setModalAberto(true);
    } catch (err: any) {
      alert(err.message || "Erro ao enviar");
    } finally {
      setIsSending(false);
    }
  };

  const handleAprovar = async (id: number) => {
    try {
      await sugestaoService.aprovarSugestao(id);
      await carregarSugestoes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReprovar = async (id: number) => {
    try {
      await sugestaoService.reprovarSugestao(id);
      await carregarSugestoes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dadosExibidos = listaSugestoes.filter((item) => {
    if (filtro === "Todos") return true;
    if (filtro === "Pendentes") return item.status === "PENDENTE";
    if (filtro === "Aprovados") return item.status === "APROVADO";
    if (filtro === "Reprovados") return item.status === "REPROVADO";
    return true;
  });

  return (
    <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4">
      <div className={`bg-[#C83D3D] w-full ${modoAdmin ? "min-h-[92vh] lg:min-h-[95vh]" : "min-h-[75vh] min-[360px]:min-h-[80vh]"} rounded-[15px] shadow-2xl px-3 min-[360px]:px-4 sm:px-6 md:px-10 relative overflow-hidden pb-20`}>
        
        <div className="absolute top-5 sm:top-10 left-0 bg-white text-[#101625] text-[1.1rem] min-[350px]:text-[1.4rem] sm:text-[2rem] md:text-[3rem] font-black px-6 min-[350px]:px-16 sm:px-[150px] md:px-[200px] lg:px-[250px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
          Sugestões
        </div>

        {!modoAdmin && (
          <div className="absolute top-20 min-[360px]:top-24 sm:top-40 md:top-52 lg:top-60 left-0 bg-white text-[#101625] text-[0.65rem] min-[360px]:text-[0.7rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.4rem] 2xl:text-[1.5rem] font-black px-2 sm:px-20 md:px-[100px] lg:px-[200px] xl:px-[300px] 2xl:px-[400px] py-2 rounded-r-[5px] shadow-md max-w-[90%] truncate sm:whitespace-nowrap">
            Você tem alguma sugestão? Compartilhe com a gente!
          </div>
        )}

        <div className={`left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-1 sm:px-4 relative ${modoAdmin ? "mt-[90px] sm:mt-[130px] md:mt-[160px] lg:mt-[180px]" : "mt-[170px] min-[360px]:mt-[210px] sm:mt-[240px] md:mt-[260px] lg:mt-[280px] xl:mt-[300px]"}`}>
          
          {modoAdmin && (
            <div className="w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] flex items-center justify-between relative mb-6 mt-6 min-[360px]:mt-10 md:mt-16 xl:mt-10">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 sm:gap-5 md:gap-8 relative z-40">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <img src={filtroIcon} alt="filtro" className="relative top-[10px] sm:top-[15px] w-full h-full scale-[1.1] sm:scale-[1.3] object-contain md:translate-y-2" />
                </div>
                <span className="text-white font-bold text-sm sm:text-[1.1rem] md:text-xl translate-y-2.5 sm:translate-y-4 md:translate-y-6.5 -translate-x-1 sm:-translate-x-3 md:-translate-x-8.5">
                  {filtro}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute top-10 sm:top-12 left-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50 min-w-[150px] sm:min-w-[180px] md:translate-y-7">
                  {["Todos", "Pendentes", "Aprovados", "Reprovados"].map((item) => (
                    <button key={item} onClick={() => { setFiltro(item as TipoFiltro); setShowDropdown(false); }} className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left font-semibold text-[#101625] hover:bg-[#f1f1f1] transition-all text-sm sm:text-base">
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={`${modoAdmin ? "bg-[#D86062]" : "bg-white"} rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[320px] min-[360px]:h-[380px] sm:h-[420px] md:h-[340px] lg:h-[380px] xl:h-[450px] flex flex-col overflow-hidden relative`}>
            
            {modoAdmin && (
              <button onClick={carregarSugestoes} disabled={loading} className="absolute top-4 right-5 sm:top-5 sm:right-7 z-30 p-2 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 rounded-full transition-all duration-200 disabled:opacity-50" title="Atualizar sugestões">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 sm:w-7 sm:h-7 ${loading ? "animate-spin" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            )}

            {modoAdmin ? (
              <div className="flex-1 overflow-y-auto scroll-modern pl-3 pr-12 sm:pl-4 sm:pr-16 py-14 sm:py-16 md:py-14">
                {loading && listaSugestoes.length === 0 ? (
                  <div className="text-center py-20 text-white/60">
                    Carregando sugestões...
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-red-300 mb-4 text-sm sm:text-base">{error}</p>
                    <button onClick={carregarSugestoes} className="bg-white text-[#C83D3D] px-5 py-2 rounded-full font-bold hover:bg-gray-100 text-sm">
                      Tentar novamente
                    </button>
                  </div>
                ) : dadosExibidos.length > 0 ? (
                  dadosExibidos.map((sugestao) => (
                    <SugestaoCard key={sugestao.id_sugestao} id={sugestao.id_sugestao} texto={sugestao.texto} statusInicial={sugestao.status} usuario={sugestao.usuario} modoAdmin={true} onAprovar={() => handleAprovar(sugestao.id_sugestao)} onReprovar={() => handleReprovar(sugestao.id_sugestao)} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full py-20">
                    <p className="text-white opacity-70 font-semibold text-sm sm:text-base">
                      Nenhuma sugestão encontrada.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <textarea disabled={isSending} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={isSending ? "Enviando sua sugestão..." : "Digite sua sugestão aqui"} className="w-full h-full resize-none outline-none text-center text-[#A8A8A8] font-semibold text-sm sm:text-base md:text-lg scroll-modern overflow-y-overlay md:overflow-y-auto disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center pt-[140px] min-[360px]:pt-[170px] sm:pt-[180px] md:pt-[135px] lg:pt-[150px] xl:pt-[190px]" />
            )}
          </div>

          {!modoAdmin && (
            <button disabled={isSending || !texto.trim()} onClick={enviarSugestao} className={`mt-5 sm:mt-8 bg-[#383636] text-white px-8 sm:px-14 py-2.5 sm:py-3 rounded-[10px] font-extrabold text-base sm:text-[1.6rem] transition ${isSending || !texto.trim() ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}>
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          )}
        </div>

        {!modoAdmin && (
          <LayoutAviso aberto={modalAberto} fechar={() => setModalAberto(false)} titulo="Sua sugestão foi enviada com sucesso!" descricao="Agradecemos sua contribuição para melhorar a experiência com a AAPM." textoBotao="Fechar" largura="max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl" corFundo="#73B36B" corTitulo="#5E9F57" corBotao="#24933C" />
        )}
      </div>
    </div>
  );
}