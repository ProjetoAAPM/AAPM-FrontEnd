import { useState } from "react";
import LayoutAviso from "../../alerts/LayoutAviso";

export default function Sugestoes() {
  const [texto, setTexto] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  function enviarSugestao() {
    console.log("Sugestão enviada:", texto);

    setTexto("");
    setModalAberto(true);
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto min-h-[85vh]">
      <div className="bg-[#C83D3D] w-full min-h-[80vh] rounded-[15px] shadow-2xl px-4 sm:px-6 md:px-10 relative overflow-hidden">

        <div
          className="
            absolute
            top-6
            sm:top-10
            left-0
            bg-white
            text-[#101625]
            text-[1.2rem]
            min-[350px]:text-[1.4rem]
            sm:text-[2rem]
            md:text-[3rem]
            font-black
            px-8
            min-[20px]:px-16
            sm:px-[150px]
            md:px-[200px]
            lg:px-[250px]
            py-1
            rounded-r-[10px]
            shadow-md
            whitespace-nowrap
          "
        >
          Sugestões
        </div>

        <div
          className="
            absolute top-24 sm:top-40 md:top-52 lg:top-60 left-0
            bg-white text-[#101625]
            text-[0.7rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.4rem] 2xl:text-[1.5rem]
            font-black
            px-2 sm:px-20 md:px-[100px] lg:px-[200px] xl:px-[300px] 2xl:px-[400px]
            py-2 rounded-r-[5px] shadow-md
          "
        >
          Você tem alguma sugestão? Compartilhe com a gente!
        </div>

        <div
          className="
            absolute left-1/2 -translate-x-1/2
            top-[180px] sm:top-[220px] md:top-[260px] lg:top-[300px]
            flex flex-col items-center gap-6 sm:gap-10 md:gap-15 w-full px-4
          "
        >
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua sugestão aqui."
            className="
              w-full max-w-[500px] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1250px]
              h-[350px] sm:h-[280px] md:h-[240px] lg:h-[230px] xl:h-[250px] 2xl:h-[300px]
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
              hover:cursor-pointer
            "
          >
            Enviar
          </button>
        </div>
        <LayoutAviso
          aberto={modalAberto}
          fechar={() => setModalAberto(false)}

          titulo="Sua sugestão foi enviada com sucesso!"
          descricao="Agradecemos sua contribuição para melhorar a experiência com a AAPM."

          textoBotao="Fechar"

          largura="max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"

          corFundo="#73B36B"
          corTitulo="#5E9F57"
          corBotao="#24933C"
        />
      </div>

    </div>
  );
}