import BarraPontos from "./BarraPontos";
import PorcoPorcentagem from "./PorcoPorcentagem";
import Moeda from "./MoedaTotal";

export default function Pontuacao({
  pontos,
  progresso,
  loading,
}: {
  pontos: number;
  progresso: number;
  loading: boolean;
}) {
  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="relative bg-[#FFEEA8] rounded-2xl shadow-2xl overflow-hidden w-full min-h-[620px] min-[350px]:min-h-[720px] sm:min-h-[760px] md:min-h-[720px] lg:min-h-[730px] xl:min-h-[740px] 2xl:min-h-[820px] px-2 min-[350px]:px-3 sm:px-5 sm:py-6 md:px-8 md:py-8 lg:px-8 lg:py-6">
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <span className="text-lg sm:text-2xl font-bold">Carregando...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <BarraPontos progresso={progresso} />
              <PorcoPorcentagem progresso={progresso} />
            </div>
            <Moeda total={pontos} />
          </>
        )}
      </div>
    </div>
  );
}