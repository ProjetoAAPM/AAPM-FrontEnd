import { Star, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ExtratoItem = {
  tipo: "premio" | "pontos" | "resgate";
  premio?: string;
  pontos?: number;
  valor?: number;
  descricao?: string;
  mensagem?: string;
};

type BarraPontosProps = {
  progresso?: number;
  premium?: boolean;
  onPremiosCalculados?: (premios: ExtratoItem[]) => void;
  animar?: boolean;
  pontosAnterior?: number;
  pontosAtual?: number;
};

export default function BarraPontos({
  progresso = 0,
  premium = false,
  onPremiosCalculados,
  animar = false,
  pontosAnterior = 0,
  pontosAtual = 0,
}: BarraPontosProps) {
  const maxBarra = premium ? 14000 : 10000;

  const valores = premium
    ? [0, 2000, 4000, 6000, 8500, 11500, 14000]
    : [0, 2000, 3500, 5000, 7500, 10000];

  const ultimaStringPremios = useRef("");
  const [progressoAnimado, setProgressoAnimado] = useState(0);
  const [premioCelebracao, setPremioCelebracao] = useState<string | null>(null);
  const [marcoAtual, setMarcoAtual] = useState<number | null>(null);
  const [showGlass, setShowGlass] = useState(false);
  const marcosJaCelebrados = useRef<number[]>([]);

  const progressoPercentual = Math.min(
    (progressoAnimado / maxBarra) * 100,
    100
  );

  const desbloqueioCinema = progressoPercentual >= 82;

  const premios = premium
    ? [
      "Brindes em Dobro",
      "Chaveiro",
      "Cordão",
      "Crachá",
      "Camiseta",
      desbloqueioCinema ? "Cinema" : "Brinde Surpresa",
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

  const pontosConfig = valores.map((valor) => ({
    valor,
    pos: (valor / maxBarra) * 100,
  }));

  useEffect(() => {
    if (!animar) {
      setProgressoAnimado(progresso);
      return;
    }

    if (pontosAtual <= pontosAnterior) {
      setProgressoAnimado(progresso);
      return;
    }

    marcosJaCelebrados.current = [];

    setProgressoAnimado(pontosAnterior);
  }, [animar, progresso, pontosAnterior, pontosAtual]);

  useEffect(() => {
    if (!animar) return;

    if (pontosAtual <= pontosAnterior) return;

    const incremento = Math.max(
      Math.ceil((pontosAtual - pontosAnterior) / 60),
      1
    );

    const intervalo = setInterval(() => {
      setProgressoAnimado((atual) => {
        const proximo = atual + incremento;

        if (proximo >= pontosAtual) {
          clearInterval(intervalo);
          return pontosAtual;
        }

        return proximo;
      });
    }, 35);

    return () => clearInterval(intervalo);
  }, [animar, pontosAnterior, pontosAtual]);

  useEffect(() => {
    if (!animar) return;

    valores.forEach((valorMeta, index) => {
      if (index === 0) return;

      const jaCelebrou =
        marcosJaCelebrados.current.includes(index);

      if (
        !jaCelebrou &&
        progressoAnimado >= valorMeta
      ) {
        marcosJaCelebrados.current.push(index);

        setMarcoAtual(index);
        setShowGlass(true);

        setTimeout(() => {
          setMarcoAtual(null);
          setShowGlass(false);
        }, 2200);
      }
    });
  }, [progressoAnimado, animar, valores]);

  useEffect(() => {
    if (marcoAtual === null) return;

    setPremioCelebracao(premios[marcoAtual]);

    const timer = setTimeout(() => {
      setPremioCelebracao(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [marcoAtual, premios]);

  useEffect(() => {
    if (onPremiosCalculados) {
      const historicoAutomatico: ExtratoItem[] = [];

      historicoAutomatico.push({
        tipo: "pontos",
        pontos: progresso,
      });

      valores.forEach((valorMeta, index) => {
        if (progresso >= valorMeta && index > 0) {
          historicoAutomatico.push({
            tipo: "premio",
            premio: premios[index],
          });
        }
      });

      const stringAtual = JSON.stringify(historicoAutomatico);
      if (ultimaStringPremios.current !== stringAtual) {
        ultimaStringPremios.current = stringAtual;

        setTimeout(() => {
          onPremiosCalculados(historicoAutomatico);
        }, 0);
      }
    }
  }, [progresso, premium, onPremiosCalculados]);

  function fecharCelebracao() {
    setPremioCelebracao(null);
  }

  return (
    <>
      {premioCelebracao && (
        <div
          onClick={fecharCelebracao}
          className="
          fixed inset-0
          bg-black/50
          backdrop-blur-md
          z-[9999]
          flex flex-col
          items-center
          justify-center
          cursor-pointer
        "
        >
          <Star
            className="
            w-32 h-32
            sm:w-40 sm:h-40
            text-[#FFDE59]
            fill-[#FFDE59]
            animate-premio-gigante
          "
          />

          <h2 className="text-white text-3xl sm:text-5xl font-bold mt-6">
            {premioCelebracao}
          </h2>

          <p className="text-white/80 text-lg mt-2">
            Desbloqueado
          </p>
        </div>
      )}

      <div className="relative w-full max-w-[1610px] mx-auto bg-[#383636]/90 backdrop-blur-md rounded-full px-2 py-2 sm:p-4 md:p-5 mt-4 overflow-visible">
        {showGlass && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-md rounded-full z-[5] animate-pulse pointer-events-none" />
        )}
        <div className="relative w-full bg-[#D3D3D3] rounded-full h-4 sm:h-6 md:h-7 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] overflow-visible">

          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out shadow-lg z-0 h-4 sm:h-6 md:h-7 ${premium ? "bg-[#DB4547]" : "bg-[#71CFFF]"
              }`}
            style={{ width: `${progressoPercentual}%` }}
          />

          {pontosConfig.map((ponto, index) => {
            const isPrimeira = index === 0;
            const isUltima = index === pontosConfig.length - 1;
            const isCelebrando = marcoAtual === index;

            return (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-10 group"
                style={{ left: `${ponto.pos}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={`rounded-full shadow-lg flex items-center justify-center text-white ${premium ? "bg-[#FFD700]" : "bg-[#414141]"
                      } ${isPrimeira || isUltima
                        ? "w-[28px] h-[28px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px]"
                        : "hidden min-[300px]:flex w-[24px] h-[24px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                      } ${isCelebrando ? "animate-marco-brilho shadow-[0_0_35px_rgba(255,255,255,0.95)] z-[30]" : ""}`}
                    style={
                      isCelebrando
                        ? { transform: "scale(1.25) rotate(360deg)", transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }
                        : {}
                    }
                  >
                    {isPrimeira && (
                      <span
                        className={`font-black leading-none ${premium ? "text-[#383636]" : "text-[#CCCCCC]"
                          } text-[0.55rem] sm:texts-xl md:text-2xl`}
                      >
                        {premium ? "2x" : "1x"}
                      </span>
                    )}

                    {isUltima && (
                      <div className="relative flex gap-[1px] sm:gap-1 group">
                        <Star className="w-2 h-2 sm:w-4 sm:h-4 md:w-4 md:h-4 text-[#30B0F2] fill-[#30B0F2]" />
                        <Star
                          className={`w-2 h-2 sm:w-5 sm:h-5 md:w-7 md:h-7 ${premium
                              ? "text-[#383636] fill-[#383636]"
                              : "text-[#FFDE59] fill-[#FFDE59]"
                            }`}
                        />
                        <Star className="w-2 h-2 sm:w-4 sm:h-4 md:w-4 md:h-4 text-[#E34747] fill-[#E34747]" />

                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-[#414141] text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
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
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 ${premium
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
    </>
  );
}