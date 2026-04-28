import { Star } from "lucide-react";

export default function BarraPontos({ progresso }) {
  const valores = [0, 2000, 3500, 5000, 7500, 10000];

  const pontosConfig = valores.map((valor) => ({
    valor,
    premio: "",
    pos: (valor / 10000) * 100,
  }));

  const premios = [
    "Pontos normais",
    "Chaveiro",
    "Cordão",
    "Crachá",
    "Camiseta",
    "Dia da Pizza",
  ];

  return (
    <div className="w-full max-w-[1610px] mx-auto bg-[#383636] rounded-full p-3 sm:p-4 md:p-5">
      <div className="relative w-full bg-[#D3D3D3] rounded-full h-6 sm:h-6 md:h-7 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] overflow-visible">
        
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-6 sm:h-6 md:h-7 bg-[#71CFFF] rounded-full transition-all duration-500 shadow-md z-0"
          style={{ width: `${progresso}%` }}
        />

        {pontosConfig.map((ponto, index) => {
          const isPrimeira = index === 0;
          const isUltima = index === pontosConfig.length - 1;

          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-10 group"
              style={{ left: `${ponto.pos}%` }}
            >
              <div className="relative flex items-center justify-center">

                <div
                  className={`
                    rounded-full bg-[#414141] shadow-lg
                    flex items-center justify-center text-white z
                    ${
                      isPrimeira || isUltima
                        ? "w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px]"
                        : "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] hidden sm:flex"
                    }
                  `}
                >
                  {isPrimeira && (
                    <span className="text-xl sm:text-sm md:text-lg font-black text-[#CCCCCC] leading-none">
                      1x
                    </span>
                  )}

                  {isUltima && (
                    <div className="relative flex gap-0.5 sm:gap-1 group">
                      
                      <Star className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] text-[#30B0F2] fill-[#30B0F2]" />
                      <Star className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[28px] md:h-[28px] text-[#FFDE59] fill-[#FFDE59]" />
                      <Star className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] text-[#E34747] fill-[#E34747]" />

                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Dia da Pizza
                      </div>

                    </div>
                  )}
                </div>

                {!isPrimeira && !isUltima && (
                  <Star
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25px] h-[25px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px] text-[#FFDE59] fill-[#FFDE59]"
                  />
                )}

                {!isUltima && (
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {premios[index]}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}