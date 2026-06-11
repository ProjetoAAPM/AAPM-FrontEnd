import porquinho from "../../assets/images/Porquinho.png";
import moeda from "../../assets/images/moeda.png";
import MoedaPremium from "../../assets/images/MoedaPremium.png";

type Props = {
  progresso?: number;
  animar?: boolean;
  isPremium?: boolean;
};

export default function PorcoPorcentagem({
  progresso = 0,
  animar = false,
  isPremium = false
}: Props) {
  const percentual = Math.min(Math.max(progresso, 0), 100);

  const ImagemMoeda = isPremium ? MoedaPremium : moeda;

  return (
    <div className="relative flex items-center justify-center w-full mt-20 min-[350px]:mt-35 sm:mt-25 md:mt-6 lg:mt-2">
      {animar && (
        <>
          <img key={`moeda-1-${isPremium}`} src={ImagemMoeda} alt="Moeda" className="absolute top-[-80px] left-[46%] w-9 sm:w-12 md:w-14 z-20 moeda-caindo" />
          <img key={`moeda-2-${isPremium}`} src={ImagemMoeda} alt="Moeda" className="absolute top-[-120px] left-[52%] w-8 sm:w-10 md:w-12 z-20 moeda-caindo" style={{ animationDelay: "0.15s" }} />
          <img key={`moeda-3-${isPremium}`}  src={ImagemMoeda} alt="Moeda" className="absolute top-[-100px] left-[42%] w-7 sm:w-9 md:w-11 z-20 moeda-caindo" style={{ animationDelay: "0.3s" }} />
        </>
      )}

      <img src={porquinho} alt="Porquinho" className={`porco-interativo w-full max-w-[250px] min-[350px]:max-w-[300px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[600px] xl:max-w-[650px] 2xl:max-w-[700px] h-auto object-contain ${animar ? "porco-celebrando" : ""}`} />

      <span className="absolute text-[1.2rem] min-[350px]:text-[1.5rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-bold text-[#BA96B5] pointer-events-none">
        {Math.floor(percentual)}%
      </span>
    </div>
  );
}