import { useState } from "react";
import BarraPontos from "./BarraPontos";
import PorcoPorcentagem from "./PorcoPorcentagem";
import Moeda from "./MoedaTotal";

const premios = {
  2000: "Chaveiro",
  3500: "Cordão",
  5000: "Cartão",
  7500: "Camiseta",
  10000: "Dia da pizza"
};

export default function Pontuacao({ setExtrato }) {
  const [pontos, setPontos] = useState(0);

  function comprar() {
    setPontos((prev) => {
      const novo = prev >= 10000 ? 0 : prev + 2500;

      const ganhos = [];

      ganhos.push({
        tipo: "pontos",
        valor: 2500,
        mensagem: "Você ganhou 2500 pontos",
      });

      Object.entries(premios).forEach(([marco, premio]) => {
        const valorMarco = Number(marco);

        if (prev < valorMarco && novo >= valorMarco) {
          ganhos.push({
            tipo: "premio",
            valor: valorMarco,
            premio: premio,
            mensagem: `Você ganhou: ${premio}`,
          });
        }
      });

      setExtrato((old) => [...ganhos, ...old]);

      return novo;
    });
  }

  const progressoPremio = (pontos / 10000) * 100;

  return (
    <div
      className="w-full max-w-[1890px] mx-auto px-2 min-[375px]:px-3 sm:px-4 md:px-6 lg:px-8xl:px-10 2xl:px-10"
    >
      <div
        className="bg-[#FFEEA8] w-full
          min-h-[70vh]
          sm:min-h-[75vh]
          md:min-h-[80vh]
          lg:min-h-[82vh]
          xl:min-h-[85vh]
          2xl:min-h-[85vh]

          rounded-[10px]
          sm:rounded-[12px]
          md:rounded-[15px]
          lg:rounded-[15px]
          xl:rounded-[15px]
          2xl:rounded-[15px]

          shadow-2xl
          p-4
          sm:p-5
          md:p-7
          lg:p-8
          xl:p-10
          2xl:p-10
        "
      >
        <div
          className="
            flex
            flex-col
            items-center

            gap-6
            sm:gap-8
            md:gap-10
            lg:gap-12
            xl:gap-15
            2xl:gap-15
          "
        >
          <BarraPontos progresso={progressoPremio} />
          <PorcoPorcentagem progresso={progressoPremio} />
          <Moeda total={pontos} />
        </div>

        <button
          onClick={comprar}
          className="
            bg-black
            text-white

            mt-6
            sm:mt-8
            md:mt-10
            px-3
            py-2

            sm:px-4
            sm:py-2

            md:px-5
            md:py-2.5

            lg:px-6
            lg:py-3
            rounded

            text-sm
            sm:text-base
            md:text-lg
            lg:text-lg
            xl:text-xl
            2xl:text-xl
          "
        >
          teste barra
        </button>
      </div>
    </div>
  );
}