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

type ExtratoItem = {
  tipo: string;
  valor: number;
  mensagem: string;
  premio?: string;
};

type PontuacaoProps = {
  setExtrato: React.Dispatch<React.SetStateAction<ExtratoItem[]>>;
};

export default function Pontuacao({ setExtrato }: PontuacaoProps) {
  const [pontos, setPontos] = useState(0);

  function comprar() {
  setPontos((prev) => {
    const novo = prev >= 10000 ? 0 : prev + 2500;


    const ganhos: ExtratoItem[] = [];

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
    <div className="w-full max-w-[1890px] mx-auto px-6 md:px-10 md:mt-2">
      
      <div className="bg-[#FFF3C2] w-full min-h-[85vh] rounded-[15px] shadow-2xl p-10">

        <div className="flex flex-col items-center gap-15">
          <BarraPontos progresso={progressoPremio} />
          <PorcoPorcentagem progresso={progressoPremio} />
          <Moeda total={pontos} />
        </div>

        <button
          onClick={comprar}
          className="bg-black text-white px-4 py-2 rounded"
        >
          teste barra
        </button>

      </div>

    </div>
  );
}