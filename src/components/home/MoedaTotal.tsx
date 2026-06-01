import { useState } from "react";
import moeda from "../../assets/images/moeda.png";
import moedaPremium from "../../assets/images/MoedaPremium.png";

export default function Moeda({ total = 0, premium = false }) {
  const [animando, setAnimando] = useState(false);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  function handleClick() {
    if (animando) return;

    setAnimando(true);
    setMostrarInfo(false);

    setTimeout(() => {
      setMostrarInfo(true);
    }, 500);

    setTimeout(() => {
      setMostrarInfo(false);
      setAnimando(false);
    }, 2500);
  }

  return (
    <div className="absolute bottom-20 right-5 sm:bottom-5 sm:right-5 md:bottom-8 md:right-8 flex items-center">
      
      {mostrarInfo && (
        <div
          className={`
            px-6 py-3 sm:px-10 sm:py-4 rounded-full text-black font-black
            text-[0.8rem] sm:text-[1rem] md:text-[1.3rem]
            shadow-md mr-[-20px] z-0
            ${premium
              ? "bg-gradient-to-r from-[#FFD700] to-[#E6BE00]"
              : "bg-gradient-to-r from-gray-300 to-gray-400"
            }
          `}
        >
          {total} pts
        </div>
      )}

      <img
        src={premium ? moedaPremium : moeda}
        alt="Moeda"
        onClick={handleClick}
        className={`
          cursor-pointer w-[55px] min-[350px]:w-[75px] sm:w-[80px] md:w-[90px]
          h-auto object-contain relative z-10
          ${premium ? "drop-shadow-[0_0_10px_#FFD700]" : ""}
          ${animando ? "animate-[moedaAbrindo_0.8s_ease-out]" : ""}
        `}
      />
    </div>
  );
}