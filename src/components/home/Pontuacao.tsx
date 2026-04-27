import { useState } from "react";
import BarraPontos from "./BarraPontos";
import PorcoPorcentagem from "./PorcoPorcentagem";
import Moeda from "./MoedaTotal";

export default function Pontuacao() {
  const [pontos, setPontos] = useState(0);

  function comprar() {
    setPontos((prev) => (prev >= 10000 ? 0 : prev + 2500));
  }

  const progressoPremio = (pontos / 10000) * 100;

  return (
    <div className="w-full max-w-[1890px] mx-auto px-6 md:px-10">
      
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