import { useState } from "react";
import BarraPontos from "./BarraPontos";
import PorcoPorcentagem from "./PorcoPorcentagem";

export default function Pontuacao() {
  const [progressoPremio, setProgressoPremio] = useState(40);

  function comprar() {
    setProgressoPremio((prev) => (prev + 20) % 100);
  }

  return (
    <div className="w-full max-w-[1890px] mx-auto px-6 md:px-10">

      <div className="bg-[#FFF3C2] w-full min-h-[85vh] rounded-[15px] shadow-2xl p-10">

        <div className="flex flex-col items-center gap-40 mb-10">
          <BarraPontos progresso={progressoPremio} />
          <PorcoPorcentagem progresso={progressoPremio} />
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