import porquinho from "../../assets/images/Porquinho.png";

export default function PorcoPorcentagem({ progresso }) {
  return (
    <div
      className="
        relative
        flex
        items-center
        justify-center

        w-full

        mt-20
        min-[350px]:mt-35
        sm:mt-25
        md:mt-6
        lg:mt-2
      "
    >
      <img
        src={porquinho}
        alt="Porquinho"
        className="
          w-full

          max-w-[250px]
          min-[350px]:max-w-[300px]

          sm:max-w-[450px]
          md:max-w-[520px]
          lg:max-w-[600px]
          xl:max-w-[650px]
          2xl:max-w-[700px]

          h-auto
          object-contain
        "
      />

      <span
        className="
          absolute

          text-[1.2rem]
          min-[350px]:text-[1.5rem]

          sm:text-[2.5rem]
          md:text-[3.5rem]
          lg:text-[5rem]

          font-bold
          text-[#BA96B5]
        "
      >
        {Math.floor(progresso)}%
      </span>
    </div>
  );
}