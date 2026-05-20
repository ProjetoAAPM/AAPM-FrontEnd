import { Star } from "lucide-react";
import {Lock}  from "lucide-react"

export default function BarraPontos({ progresso, premium = false }) {

  const maxBarra = premium ? 14000 : 10000;

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
        progresso >= 82
          ? "Cinema"
          : "Brinde Surpresa",
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

  return (
    <div
      className="
        w-full
        max-w-[1610px]
        mx-auto

        bg-[#383636]
        rounded-full

        px-2
        py-2

        min-[350px]:px-3

        sm:p-4
        md:p-5

        mt-4
      "
    >
      <div
        className="
          relative
          w-full

          bg-[#D3D3D3]
          rounded-full

          h-4
          min-[350px]:h-5

          sm:h-6
          md:h-7

          shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
          overflow-visible
        "
      >

        <div
          className={`
            absolute
            left-0
            top-1/2
            -translate-y-1/2

            rounded-full
            transition-all
            duration-500
            shadow-md
            z-0

            h-4
            min-[350px]:h-5

            sm:h-6
            md:h-7

            ${premium ? "bg-[#DB4547]" : "bg-[#71CFFF]"}
          `}
          style={{ width: `${progresso}%` }}
        />

        {pontosConfig.map((ponto, index) => {
          const isPrimeira = index === 0;
          const isUltima = index === pontosConfig.length - 1;

          return (
            <div
              key={index}
              className="
                absolute
                top-1/2
                -translate-y-1/2
                -translate-x-1/2

                flex
                items-center
                justify-center

                z-10
                group
              "
              style={{ left: `${ponto.pos}%` }}
            >
              <div className="relative flex items-center justify-center">

                <div
                  className={`
                    rounded-full
                    ${premium ? "bg-[#FFD700]" : "bg-[#414141]"}
                    shadow-lg

                    flex
                    items-center
                    justify-center

                    text-white

                    ${
                      isPrimeira || isUltima
                        ? `
                          w-[28px] h-[28px]

                          min-[350px]:w-[35px]
                          min-[350px]:h-[35px]

                          sm:w-[60px]
                          sm:h-[60px]

                          md:w-[70px]
                          md:h-[70px]

                          lg:w-[80px]
                          lg:h-[80px]
                        `
                        : `
                          hidden min-[300px]:flex

                          w-[24px]
                          h-[24px]

                          min-[350px]:w-[28px]
                          min-[350px]:h-[28px]

                          sm:w-[45px]
                          sm:h-[45px]

                          md:w-[50px]
                          md:h-[50px]

                          lg:w-[60px]
                          lg:h-[60px]
                        `
                    }
                  `}
                >

                  {isPrimeira && (
                    <span
                      className={`
                        font-black
                        leading-none

                        ${premium
                          ? `
                            text-[0.55rem]

                            min-[350px]:text-[1rem]

                            sm:text-xl
                            md:text-2xl
                          `
                          : `
                            text-[0.55rem]

                            min-[350px]:text-[0.7rem]

                            sm:text-sm
                            md:text-lg
                          `
                        }
                        ${premium ? "text-[#383636]" : "text-[#CCCCCC]"}
                      `}
                    >
                      {premium ? "2x" : "1x"}
                    </span>
                  )}

                  {isUltima && (
                    <div className="relative flex gap-[1px] sm:gap-1 group">

                      <Star
                        className="
                          w-[6px]
                          h-[6px]

                          min-[350px]:w-[8px]
                          min-[350px]:h-[8px]

                          sm:w-[16px]
                          sm:h-[16px]

                          md:w-[20px]
                          md:h-[20px]

                          text-[#30B0F2]
                          fill-[#30B0F2]
                        "
                      />

                      <Star
                        className={`
                          w-[8px]
                          h-[8px]

                          min-[350px]:w-[10px]
                          min-[350px]:h-[10px]

                          sm:w-[20px]
                          sm:h-[20px]

                          md:w-[28px]
                          md:h-[28px]

                          ${
                            premium
                              ? "text-[#383636] fill-[#383636]"
                              : "text-[#FFDE59] fill-[#FFDE59]"
                          }
                        `}
                      />

                      <Star
                        className="
                          w-[6px]
                          h-[6px]

                          min-[350px]:w-[8px]
                          min-[350px]:h-[8px]

                          sm:w-[16px]
                          sm:h-[16px]

                          md:w-[20px]
                          md:h-[20px]

                          text-[#E34747]
                          fill-[#E34747]
                        "
                      />

                      <div
                        className="
                          absolute
                          -top-14
                          left-1/2
                          -translate-x-1/2

                          opacity-0
                          group-hover:opacity-100
                          transition

                          bg-[#414141]
                          text-white

                          text-xs
                          px-2
                          py-1

                          rounded
                          whitespace-nowrap
                        "
                      >
                        {premios[index]}
                      </div>
                    </div>
                  )}
                </div>

                {!isPrimeira && !isUltima && (
                  index === 5 && premium && progresso < 82 ? (
                    <Lock
                      strokeWidth={3}
                      className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2

                        w-[10px]
                        h-[10px]

                        min-[300px]:w-[10px]
                        min-[300px]:h-[10px]

                        sm:w-[20px]
                        sm:h-[20px]

                        md:w-[24px]
                        md:h-[24px]

                        lg:w-[25px]
                        lg:h-[25px]

                        text-[#383636]
                      "
                    />
                  ) : (
                    <Star
                      className={`
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2

                        w-[10px]
                        h-[10px]

                        min-[350px]:w-[12px]
                        min-[350px]:h-[12px]

                        sm:w-[20px]
                        sm:h-[20px]

                        md:w-[24px]
                        md:h-[24px]

                        lg:w-[32px]
                        lg:h-[32px]

                        ${
                          premium
                            ? "text-[#383636] fill-[#383636]"
                            : "text-[#FFDE59] fill-[#FFDE59]"
                        }
                      `}
                    />
                  )
                )}

                {!isUltima && (
                  <div
                    className="
                      hidden sm:block

                      absolute
                      -top-9

                      opacity-0
                      group-hover:opacity-100
                      transition

                      bg-[#414141]
                      text-white

                      text-xs
                      px-2
                      py-1

                      rounded
                      whitespace-nowrap
                    "
                  >
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