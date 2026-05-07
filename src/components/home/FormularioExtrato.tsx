import "../Scrollbar/scrollbar.css";

interface ItemExtrato {
  tipo: "premio" | "pontos" | "resgate" | "ganho";
  premio?: string;
  mensagem?: string;
  descricao?: string;
  valor?: number;
  pontos?: number;
}

export default function FormularioExtrato({ extrato = [] as ItemExtrato[], modoAdmin = false }) {
  return (
    <div className="w-full max-w-[1890px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-3 lg:h-[93vh] overflow-hidden">

        <div className={`bg-[#DDF4FF] w-full ${modoAdmin ? "lg:w-full" : "lg:w-3/4"} min-h-[50vh] lg:h-full rounded-[15px] shadow-2xl flex flex-col px-4 sm:px-6 md:px-10 py-6 relative overflow-hidden`}>
          
          <div className="absolute top-6 sm:top-10 left-0 bg-white text-[#101625] text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-black px-[120px] sm:px-[200px] md:px-[450px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
            Formulários
          </div>

          {modoAdmin && (
            <button className="hidden lg:flex items-center justify-center bg-[#C83D3D] text-white rounded-full h-[45px] shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[130px] xl:w-[160px] text-base xl:text-lg absolute top-8 sm:top-14 right-6 sm:right-25 z-20">
              Criar formulário
            </button>
          )}

          <div className="mt-[90px] sm:mt-[100px] md:mt-[120px] bg-white flex-1 rounded-[10px] shadow-md overflow-y-auto scroll-modern min-h-0">
            <div className="min-h-[600px] md:h-[1500px]">
              Conteúdo do formulário aqui...
            </div>
          </div>

        </div>


        {!modoAdmin && (
          <div className="bg-[#BBE1FE] w-full lg:w-1/4 min-h-[50vh] lg:h-full rounded-[15px] shadow-2xl p-3 sm:p-4 relative flex flex-col overflow-hidden">
            
            <div className="absolute top-6 sm:top-10 right-0 bg-white text-[#101625] text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] font-black px-[80px] sm:px-[100px] md:px-[140px] py-1 rounded-l-[10px] shadow-md whitespace-nowrap">
              Extrato
            </div>

            <div className="mt-[90px] sm:mt-[110px] md:mt-[130px] flex-1 rounded-[10px] bg-[#BBE1FE] overflow-hidden min-h-0">
              <div className="h-full overflow-y-auto scroll-modern pr-2 sm:pr-3">
                <div className="p-2 sm:p-4 space-y-3">
                  {extrato.map((item, i) => (
                    <div key={i} className="bg-[#FFFFFF] rounded-[8px] p-3 shadow-sm flex justify-between items-center">
                     
                      {item.tipo === "premio" && (
                        <div>
                          <p className="text-[12px] sm:text-[14px] font-semibold text-yellow-700">Prêmio desbloqueado</p>
                          <p className="text-[13px] sm:text-[15px] font-bold text-black">{item.premio}</p>
                        </div>
                      )}
                      
                      <div>
                        {item.tipo === "pontos" && (
                          <>
                            <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">Ganho de pontos</p>
                            <p className="text-[13px] sm:text-[15px] font-bold text-black">{item.mensagem || item.descricao}</p>
                          </>
                        )}
                        {item.tipo === "resgate" && (
                          <>
                            <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">Reivindicação de pontos</p>
                            <p className="text-[12px] sm:text-[14px] text-gray-400 font-semibold">Brinde: {item.premio}</p>
                          </>
                        )}
                      </div>
                      <div>
                        {item.tipo === "ganho" && (
                          <p className="text-green-600 font-bold text-[14px] sm:text-[16px]">+{item.valor || item.pontos}p</p>
                        )}
                        {item.tipo === "resgate" && (
                          <span className="text-gray-400 text-lg sm:text-xl">⭐</span>
                        )}
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