import { useEffect, useState } from "react";
import SugestaoCard from "./admin/SugestaoCard";
import LayoutAviso from "../../alerts/LayoutAviso";
import "../Scrollbar/scrollbar.css";
import filtroIcon from "../../assets/icons/icone_filtro.svg";
import { sugestaoService, type ISugestao } from "../../Services/sugestaoService";

interface SugestoesProps {
  modoAdmin?: boolean;
}

export default function Sugestoes({ modoAdmin = false }: SugestoesProps) {
  const [texto, setTexto] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [listaSugestoes, setListaSugestoes] = useState<ISugestao[]>([]);
  const [filtro, setFiltro] = useState<"Todos" | "Pendentes" | "Aprovados">("Todos");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!texto.trim()) return;
    try {
      const hoje = new Date().toISOString().split("T")[0];
      if (localStorage.getItem("ultimaSugestao") === hoje) {
        alert("Você já enviou uma sugestão hoje! Tente novamente amanhã.");
        return;
      }
      await sugestaoService.enviarSugestao(texto);
      localStorage.setItem("ultimaSugestao", hoje);
      setTexto("");
      setModalAberto(true);
    } catch (err: any) {
      alert(err.message || "Erro ao enviar");
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
    return true;
  });

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="bg-[#C83D3D] w-full min-h-[80vh] rounded-[15px] shadow-2xl px-4 sm:px-6 md:px-10 relative overflow-hidden pb-20">
        <div className="absolute top-6 sm:top-10 left-0 bg-white text-[#101625] text-[1.2rem] min-[350px]:text-[1.4rem] sm:text-[2rem] md:text-[3rem] font-black px-8 min-[20px]:px-16 sm:px-[150px] md:px-[200px] lg:px-[250px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
          Sugestões
        </div>

        {!modoAdmin && (
          <div className="absolute top-24 sm:top-40 md:top-52 lg:top-60 left-0 bg-white text-[#101625] text-[0.7rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.4rem] 2xl:text-[1.5rem] font-black px-2 sm:px-20 md:px-[100px] lg:px-[200px] xl:px-[300px] 2xl:px-[400px] py-2 rounded-r-[5px] shadow-md">
            Você tem alguma sugestão? Compartilhe com a gente!
          </div>
        )}

        <div className={`left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 relative ${modoAdmin ? "mt-[100px] sm:mt-[130px] md:mt-[160px] lg:mt-[180px]" : "mt-[210px] sm:mt-[240px] md:mt-[260px] lg:mt-[280px] xl:mt-[300px]"}`}>
          {modoAdmin && (
            <div className="w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mb-6 flex items-center justify-between relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-3 sm:gap-5 md:gap-8 relative z-40">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <img src={filtroIcon} alt="filtro" className="relative top-[5px] w-full h-full scale-[1.8] sm:scale-[2] object-contain" />
                </div>
                <span className="text-white font-bold text-[1rem] sm:text-[1.1rem] md:text-xl">
                  {filtro}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute top-12 left-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50 min-w-[180px]">
                  {["Todos", "Pendentes", "Aprovados"].map((item) => (
                    <button key={item} onClick={() => { setFiltro(item as "Todos" | "Pendentes" | "Aprovados"); setShowDropdown(false); }} className="w-full px-6 py-3 text-left font-semibold text-[#101625] hover:bg-[#f1f1f1] transition-all">
                      {item}
                    </button>
                  ))}
                </div>
              )}

              <button onClick={carregarSugestoes} className="bg-white text-[#C83D3D] rounded-full h-[38px] sm:h-[40px] md:h-[42px] px-4 sm:px-6 md:px-8 shadow-lg font-bold hover:bg-[#b03535] hover:text-white transition-all text-[0.9rem] sm:text-[1rem] md:text-lg">
                Atualizar
              </button>
            </div>
          )}

          <div className={`${modoAdmin ? "bg-[#D86062]" : "bg-white"} rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[380px] sm:h-[420px] md:h-[340px] lg:h-[380px] xl:h-[420px] flex flex-col overflow-hidden relative`}>
            {modoAdmin ? (
              <div className="flex-1 overflow-y-auto scroll-modern px-4 py-6">
                {loading ? (
                  <div className="text-center py-20 text-white/60">
                    Carregando sugestões...
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-red-300 mb-4">{error}</p>
                    <button onClick={carregarSugestoes} className="bg-white text-[#C83D3D] px-6 py-2.5 rounded-full font-bold hover:bg-gray-100">
                      Tentar novamente
                    </button>
                  </div>
                ) : dadosExibidos.length > 0 ? (
                  dadosExibidos.map((sugestao) => (
                    <SugestaoCard 
                      key={sugestao.id_sugestao} 
                      id={sugestao.id_sugestao} 
                      texto={sugestao.texto} 
                      statusInicial={sugestao.status} 
                      usuario={sugestao.usuario} 
                      modoAdmin={true} 
                      onAprovar={() => handleAprovar(sugestao.id_sugestao)} 
                      onReprovar={() => handleReprovar(sugestao.id_sugestao)} 
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full py-24">
                    <p className="text-white opacity-70 font-semibold">
                      Nenhuma sugestão encontrada.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <textarea 
                value={texto} 
                onChange={(e) => setTexto(e.target.value)} 
                placeholder="Digite sua sugestão aqui." 
                className="w-full h-full px-6 py-12 md:py-16 resize-none outline-none text-center text-[#A8A8A8] font-semibold text-base md:text-lg scroll-modern overflow-y-overlay md:overflow-y-auto" 
              />
            )}
          </div>

          {!modoAdmin && (
            <button onClick={enviarSugestao} className="mt-6 sm:mt-8 bg-[#383636] text-white px-10 sm:px-14 py-3 rounded-[10px] font-extrabold text-[1.1rem] sm:text-[1.6rem] hover:scale-105 transition">
              Enviar
            </button>
          )}
        </div>

        {!modoAdmin && (
          <LayoutAviso 
            aberto={modalAberto} 
            fechar={() => setModalAberto(false)} 
            titulo="Sua sugestão foi enviada com sucesso!" 
            descricao="Agradecemos sua contribuição para melhorar a experiência com a AAPM." 
            textoBotao="Fechar" 
            largura="max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl" 
            corFundo="#73B36B" 
            corTitulo="#5E9F57" 
            corBotao="#24933C" 
          />
        )}
      </div>
    </div>
  );
}