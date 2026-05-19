import { useEffect, useState } from "react";
import SugestaoCard from './admin/SugestaoCard';
import "../Scrollbar/scrollbar.css";
import filtroIcon from "../../assets/icons/icone_filtro.svg";

interface SugestoesProps {
  modoAdmin?: boolean;
}

interface ISugestao {
  texto: string;
  status: "Pendente" | "Aprovado";
}

export default function Sugestoes({ modoAdmin = false }: SugestoesProps) {
  const [texto, setTexto] = useState("");
  const [listaDeStrings, setListaDeStrings] = useState<ISugestao[]>([]);
  const [filtro, setFiltro] = useState<"Todos" | "Pendentes" | "Aprovados">("Todos");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const dados = localStorage.getItem("sugestoes");
    if (dados) setListaDeStrings(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem("sugestoes", JSON.stringify(listaDeStrings));
  }, [listaDeStrings]);

  const removerSugestao = (indexParaRemover: number) => {
    setListaDeStrings(prev => prev.filter((_, i) => i !== indexParaRemover));
  };

  function enviarSugestao() {
    if (!texto.trim()) return;

    const hoje = new Date().toISOString().split("T")[0];
    if (localStorage.getItem("ultimaSugestao") === hoje) {
      alert("Você já enviou uma sugestão hoje. Mande novamente amanhã!");
      return;
    }

    setListaDeStrings(prev => [{ texto, status: "Pendente" }, ...prev]);
    localStorage.setItem("ultimaSugestao", hoje);
    setTexto("");
  }

  const dadosExibidos = listaDeStrings.filter(item => {
    if (filtro === "Todos") return true;
    if (filtro === "Pendentes") return item.status === "Pendente";
    if (filtro === "Aprovados") return item.status === "Aprovado";
    return true;
  });

  return (
    <div className="w-full max-w-[1800px] mx-auto min-h-[85vh] px-4 sm:px-6 md:px-10 overflow-x-hidden">
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
            <div className="w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mb-6 relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)} 
                className="flex items-center gap-3 sm:gap-5 md:gap-8 relative z-40"
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <img 
                    src={filtroIcon} 
                    alt="filtro" 
                    className="relative top-[5px] w-full h-full scale-[1.8] sm:scale-[2] object-contain" 
                  />
                </div>
                <span className="relative inline-block text-white font-bold text-[1rem] sm:text-[1.1rem] md:text-xl -left-2 min-[360px]:left-0 md:-left-[18px] min-[1330px]:-left-[35px]">{filtro}</span>
              </button>

              {showDropdown && (
                <div className="absolute top-12 left-0 bg-white rounded-xl shadow-2xl py-2 z-50 w-40 sm:w-44 md:w-48">
                  {["Todos", "Pendentes", "Aprovados"].map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => { setFiltro(opt as any); setShowDropdown(false); }} 
                      className="w-full text-left px-4 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 font-bold text-[#101625]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={`${modoAdmin ? "bg-[#D86062]" : "bg-white"} rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[380px] sm:h-[420px] md:h-[340px] lg:h-[380px] xl:h-[420px] flex flex-col overflow-hidden relative`}>

            {modoAdmin ? (
              <div className="flex-1 overflow-y-overlay md:overflow-y-auto scroll-modern px-4 py-6">
                <div className="flex flex-col gap-3 min-h-full">
                  {dadosExibidos.length > 0 ? (
                    dadosExibidos.map((str, index) => (
                      <SugestaoCard
                        key={index}
                        texto={str.texto}
                        statusInicial={str.status}
                        modoAdmin={true}
                        onRecusar={() => removerSugestao(index)}
                        onAprovar={() => {
                          setListaDeStrings(prev =>
                            prev.map((item, i) => i === index ? { ...item, status: "Aprovado" } : item)
                          );
                        }}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full py-24">
                      <p className="text-white opacity-50 font-semibold">Nenhuma sugestão ainda.</p>
                    </div>
                  )}
                </div>
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
            <button 
              onClick={enviarSugestao} 
              className="mt-6 sm:mt-8 bg-[#383636] text-white px-10 sm:px-14 py-3 rounded-[10px] font-extrabold text-[1.1rem] sm:text-[1.6rem] hover:scale-105 transition"
            >
              Enviar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}