import { Star, Lock } from "lucide-react";

export default function BarraPontos({ progresso = 0, premium = false }) {
  const maxBarra = premium ? 14000 : 10000;

  const progressoPercentual = Math.min(
    (progresso / maxBarra) * 100,
    100
  );

  const valores = premium
    ? [0, 2000, 4000, 6000, 8500, 11500, 14000]
    : [0, 2000, 3500, 5000, 7500, 10000];

  const pontosConfig = valores.map((valor) => ({
    valor,
    pos: (valor / maxBarra) * 100,
  }));

  const premios = premium
    ? [
        "Brindes em Dobro",
        "Chaveiro",
        "Cordão",
        "Crachá",
        "Camiseta",
        "Cinema / Brinde Surpresa",
        "Dia da Pizza",
      ]
    : [
        "Pontos normais",
        "Chaveiro",
        "Cordão",
        "Crachá",
        "Camiseta",
        "Dia da Pizza",
      ];

  const desbloqueioCinema = progressoPercentual >= 82;

  return (
    <div className="w-full max-w-[1610px] mx-auto bg-[#383636] rounded-full px-2 py-2 sm:p-4 md:p-5 mt-4">
      <div className="relative w-full bg-[#D3D3D3] rounded-full h-4 sm:h-6 md:h-7 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] overflow-visible">
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 shadow-md z-0 h-4 sm:h-6 md:h-7 ${
            premium ? "bg-[#DB4547]" : "bg-[#71CFFF]"
          }`}
          style={{ width: `${progressoPercentual}%` }}
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
                  className={`rounded-full shadow-lg flex items-center justify-center text-white ${
                    premium ? "bg-[#FFD700]" : "bg-[#414141]"
                  } ${
                    isPrimeira || isUltima
                      ? "w-[28px] h-[28px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px]"
                      : "hidden min-[300px]:flex w-[24px] h-[24px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                  }`}
                >
                  {isPrimeira && (
                    <span
                      className={`font-black leading-none ${
                        premium ? "text-[#383636]" : "text-[#CCCCCC]"
                      } text-[0.55rem] sm:text-xl md:text-2xl`}
                    >
                      {premium ? "2x" : "1x"}
                    </span>
                  )}

                  {isUltima && (
                    <div className="relative flex gap-[1px] sm:gap-1 group">
                      <Star className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#30B0F2] fill-[#30B0F2]" />
                      <Star
                        className={`w-2 h-2 sm:w-5 sm:h-5 md:w-7 md:h-7 ${
                          premium
                            ? "text-[#383636] fill-[#383636]"
                            : "text-[#FFDE59] fill-[#FFDE59]"
                        }`}
                      />
                      <Star className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#E34747] fill-[#E34747]" />

                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-[#414141] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {premios[index]}
                      </div>
                    </div>
                  )}
                </div>

                {!isPrimeira && !isUltima && (
                  <>
                    {premium && index === 5 && !desbloqueioCinema ? (
                      <Lock
                        strokeWidth={3}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#383636]"
                      />
                    ) : (
                      <Star
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 ${
                          premium
                            ? "text-[#383636] fill-[#383636]"
                            : "text-[#FFDE59] fill-[#FFDE59]"
                        }`}
                      />
                    )}
                  </>
                )}

                {!isUltima && (
                  <div className="hidden sm:block absolute -top-9 opacity-0 group-hover:opacity-100 transition bg-[#414141] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
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