import { useState } from "react";
import moeda from "../../assets/images/moeda.png";

export default function Moeda({ total }) {
  const [animando, setAnimando] = useState(false);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  function handleClick() {
    setAnimando(false);
    setMostrarInfo(false);

    setTimeout(() => setAnimando(true), 10);

    setTimeout(() => {
      setMostrarInfo(true);
    }, 800);

    setTimeout(() => {
      setMostrarInfo(false);
    }, 2500);
  }

  return (
    <div
      className="
        absolute

        bottom-20
        right-5

        sm:bottom-5
        sm:right-5

        md:bottom-8
        md:right-8

        flex
        items-center
      "
    >
      {mostrarInfo && (
        <div
          className="
            px-8
            py-4

            sm:px-12
            sm:py-4

            rounded-full
            bg-gradient-to-r from-gray-300 to-gray-400

            text-black
            font-black

            text-[0.8rem]
            sm:text-[1rem]
            md:text-[1.3rem]

            shadow-md
            mr-[-30px]
            z-0
          "
        >
          {total} pts
        </div>
      )}

      <img
        src={moeda}
        alt="Moeda"
        onClick={handleClick}
        className={`
          cursor-pointer

          w-[55px]
          min-[350px]:w-[75px]

          sm:w-[80px]
          md:w-[90px]

          h-auto
          object-contain
          relative
          z-10

          ${animando ? "animate-[moedaAbrindo_0.8s_ease-out]" : ""}
        `}
      />
    </div>
  );
}