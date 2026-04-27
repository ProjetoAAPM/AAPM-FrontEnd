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
    <div className="absolute bottom-[120px] sm:bottom-[80px] md:bottom-[50px] right-[100px] flex items-center">
      {mostrarInfo && (
        <div className="
          px-[75px] py-[20px] rounded-full
          bg-gradient-to-r from-gray-300 to-gray-400
          text-black font-black text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] shadow-md
          animate-[abrirDireita_0.4s_ease-out]
          mr-[-60px]
          z-0
        ">
          {total} pts
        </div>
      )}
      <img
        src={moeda}
        alt="Moeda"
        onClick={handleClick}
        className={`
          cursor-pointer
          w-[90px] sm:w-[90px] md:w-[90px] lg:w-[100px] h-auto object-contain
          relative z-10
          ${animando ? "animate-[moedaAbrindo_0.8s_ease-out]" : ""}
        `}
      />
    </div>
  );
}