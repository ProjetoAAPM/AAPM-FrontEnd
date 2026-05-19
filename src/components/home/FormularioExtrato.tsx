import { useEffect, useState } from "react";
import "../Scrollbar/scrollbar.css";
import FormularioCard from "./admin/FormularioCard";

interface FormularioData {
  id?: number;
  titulo: string;
  local: string;
  data: string;
  hora: string;
  link: string;
}

interface ItemExtrato {
  tipo: "premio" | "pontos" | "resgate" | "ganho";
  premio?: string;
  mensagem?: string;
  descricao?: string;
  valor?: number;
  pontos?: number;
}

interface FormularioExtratoProps {
  modoAdmin?: boolean;
  extrato: ItemExtrato[];
}

export default function FormularioExtrato({ modoAdmin = false, extrato = [] }: FormularioExtratoProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulariosSalvos, setFormulariosSalvos] = useState<FormularioData[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("formularios");
    if (dados) setFormulariosSalvos(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem("formularios", JSON.stringify(formulariosSalvos));
  }, [formulariosSalvos]);

  const salvarNovoFormulario = (dadosDigitados: FormularioData) => {
    const novoFormulario = { ...dadosDigitados, id: Date.now() };
    setFormulariosSalvos(prev => [novoFormulario, ...prev]);
    setMostrarFormulario(false);
  };

  const excluirFormulario = (id: number) => {
    setFormulariosSalvos(prev => prev.filter(f => f.id !== id));
  };

  const formulariosVisiveis = formulariosSalvos.filter(formulario => {
    const [dia, mes, ano] = formulario.data.split("/");
    const [hora, minuto] = formulario.hora.split(":");
    const dataHoraFormulario = new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto));
    return dataHoraFormulario >= new Date();
  });

  return (
    <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-5 lg:px-8 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-3 lg:h-[95vh]">

        <div className={`bg-[#DDF4FF] ${modoAdmin ? "w-full" : "w-full lg:w-3/4"} h-[650px] sm:h-[700px] lg:h-[95vh] rounded-[15px] shadow-2xl flex flex-col px-4 sm:px-6 md:px-10 py-6 relative overflow-hidden`}>
          
          <div className="absolute top-3 sm:top-10 left-0 bg-white text-[#101625] text-[1.2rem] min-[350px]:text-[1.4rem] sm:text-[2rem] md:text-[3rem] font-black px-8 min-[20px]:px-16 sm:px-[150px] md:px-[200px] lg:px-[250px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
            Formulários
          </div>

          <div className="mt-[90px] sm:mt-[130px] md:mt-[180px] lg:mt-[160px] w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto flex flex-col flex-1 min-h-0">
            
            {modoAdmin && (
              <div className="w-full flex justify-end mb-4">
                <button 
                  onClick={() => setMostrarFormulario(!mostrarFormulario)} 
                  className="bg-[#C83D3D] text-white rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 font-bold hover:brightness-95 transition-all whitespace-nowrap shadow-md"
                >
                  {mostrarFormulario ? "Cancelar" : "Criar formulário"}
                </button>
              </div>
            )}

            <div className="bg-white rounded-[12px] shadow-md w-full h-[380px] sm:h-[420px] md:h-[340px] lg:h-[380px] xl:h-[420px] flex flex-col overflow-hidden relative">
              <div className="flex-1 overflow-y-auto scroll-modern px-4 py-4">
                <div className="flex flex-col gap-6 w-full">
                  {modoAdmin && mostrarFormulario && <FormularioCard onSalvar={salvarNovoFormulario} somenteVisualizacao={false} />}

                  {(modoAdmin ? formulariosSalvos : formulariosVisiveis).map(formulario => (
                    <FormularioCard
                      key={formulario.id}
                      dadosIniciais={formulario}
                      somenteVisualizacao={!modoAdmin}
                      onExcluir={() => excluirFormulario(formulario.id!)}
                    />
                  ))}

                  {formulariosSalvos.length === 0 && !mostrarFormulario && (
                    <div className="py-[140px] flex items-center justify-center text-gray-500 font-semibold text-center px-4">
                      Nenhum formulário salvo ainda.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!modoAdmin && (
          <div className="bg-[#BBE1FE] w-full lg:w-1/4 min-h-[400px] sm:min-h-[500px] lg:h-full rounded-[15px] shadow-2xl p-3 sm:p-4 relative flex flex-col overflow-hidden">
            <div className="absolute top-6 sm:top-10 right-0 bg-white text-[#101625] text-[1.2rem] min-[350px]:text-[1.4rem] sm:text-[2rem] md:text-[1.5rem] font-black px-6 min-[20px]:px-16 sm:px-[100px] md:px-[200px] lg:px-[90px] py-1 rounded-l-[10px] shadow-md whitespace-nowrap">
              Extrato
            </div>

            <div className="mt-[80px] sm:mt-[110px] md:mt-[130px] flex-1 rounded-[10px] bg-[#BBE1FE] overflow-hidden min-h-0">
              <div className="h-full overflow-y-auto scroll-modern pr-2 sm:pr-3">
                <div className="p-2 sm:p-4 space-y-3">
                  {extrato.map((item, i) => (
                    <div key={i} className="bg-[#FFFFFF] rounded-[8px] p-3 shadow-sm flex justify-between items-center gap-3">
                      {item.tipo === "premio" && (
                        <div>
                          <p className="text-[12px] sm:text-[14px] font-semibold text-yellow-700">Prêmio desbloqueado</p>
                          <p className="text-[13px] sm:text-[15px] font-bold text-black">{item.premio}</p>
                        </div>
                      )}

                      <div className="flex-1">
                        {item.tipo === "pontos" && (
                          <div className="flex flex-col">
                            <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">Ganho de pontos</p>
                            <p className="text-[13px] sm:text-[15px] font-bold text-black break-words">{item.mensagem || item.descricao}</p>
                            <span className="text-green-600 font-bold text-[13px] sm:text-[15px] mt-1">+{item.valor || item.pontos} pts</span>
                          </div>
                        )}

                        {item.tipo === "resgate" && (
                          <>
                            <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">Reivindicação de pontos</p>
                            <p className="text-[12px] sm:text-[14px] text-gray-400 font-semibold">Brinde: {item.premio}</p>
                          </>
                        )}
                      </div>

                      <div className="shrink-0">
                        {item.tipo === "resgate" && <span className="text-gray-400 text-lg sm:text-xl">⭐</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}