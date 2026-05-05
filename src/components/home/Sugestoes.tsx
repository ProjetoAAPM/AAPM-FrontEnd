import { useState } from "react";

export default function Sugestoes({ modoAdmin = false }) {
  const [texto, setTexto] = useState("");

  function enviarSugestao() {
    console.log("Sugestão enviada:", texto);
    setTexto("");
  }

  return (
    <div className="w-full max-w-[1890px] mx-auto px-4 sm:px-6 md:px-10 min-h-[85vh]">
      <div className="bg-[#C83D3D] w-full min-h-[85vh] rounded-[15px] shadow-2xl px-4 sm:px-6 md:px-10 relative overflow-hidden">

        <div className="
          absolute top-6 sm:top-10 right-0
          bg-white text-[#101625]
          text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem]
          font-black
          px-6 sm:px-20 md:px-[200px] lg:px-[400px] xl:px-[600px]
          py-2 rounded-l-[10px] shadow-md
          whitespace-nowrap
        ">
          Sugestões
        </div>

        {!modoAdmin && (
          <div className="
            absolute top-24 sm:top-40 md:top-52 lg:top-60 left-0
            bg-white text-[#101625]
            text-[0.8rem] sm:text-[1rem]
            font-black
            px-6 sm:px-20 md:px-[200px] lg:px-[300px] xl:px-[400px]
            py-2 rounded-r-[5px] shadow-md
          ">
            Você tem alguma sugestão? Compartilhe com a gente!
          </div>
        )}

        <div className={`
          absolute left-1/2 -translate-x-1/2
          flex flex-col items-center gap-6 sm:gap-10 md:gap-15 w-full px-4
          ${modoAdmin 
            ? "top-[120px] sm:top-[160px] md:top-[200px]" 
            : "top-[180px] sm:top-[220px] md:top-[260px] lg:top-[300px]"}
        `}>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua sugestão aqui."
            className="
              w-full max-w-[500px] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px]
              h-[120px] sm:h-[180px] md:h-[240px] lg:h-[300px]
              px-4 sm:px-6 py-6 sm:py-10 md:py-14 lg:py-16
              rounded-[12px]
              bg-[#FFFFFF]
              text-sm sm:text-base lg:text-lg
              shadow-md outline-none text-center text-[#A8A8A8] font-semibold
            "
          />

          <button
            onClick={enviarSugestao}
            className="
              bg-[#383636] text-white
              px-6 sm:px-8 md:px-10
              py-2 sm:py-3
              rounded-[10px]
              font-extrabold
              text-[1rem] sm:text-[1.5rem] md:text-[2rem]
              hover:scale-105 transition
            "
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}