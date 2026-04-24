import porquinho from "../../assets/images/Porquinho.png"

export default function PorcoPorcentagem({ progresso }) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <img
        src= {porquinho}
        alt="Porquinho"
        className="w-full max-w-[700px] h-[500px] object-contain"
      />
      <span className="absolute ml-5 sm:ml-10 md:ml-15 lg:ml-20 text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold text-[#BA96B5]">
        {progresso}%
      </span>
  </div>
  );
}