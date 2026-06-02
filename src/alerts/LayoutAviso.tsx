import type { ReactNode } from "react";

type LayoutAvisoProps = {
  aberto: boolean;
  fechar: () => void;

  titulo: string;
  descricao?: string;

  textoBotao?: string;

  largura?: string;

  corFundo?: string;
  corTitulo?: string;
  corBotao?: string;

  children?: ReactNode;
  className?: string;
};

export default function LayoutAviso({
  aberto,
  fechar,

  titulo,
  descricao,

  textoBotao = "Fechar",

  largura = "max-w-5xl",

  corFundo = "#73B36B",
  corTitulo = "#5E9F57",
  corBotao = "#24933C",

  children,
  className = "",
}: LayoutAvisoProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[6px] px-4">

      <div
        className={`w-full ${largura} rounded-[40px] p-[5px] pt-8 shadow-2xl`}
        style={{ backgroundColor: corFundo }}
      >

        <div className="rounded-[34px] bg-[#F2F2F2] px-6 py-10 md:px-10 mt-5">

          <h1
            className={`
              text-center
              text-xl
              font-extrabold
              drop-shadow-[0_2px_0_rgba(0,0,0,0.18)]
              md:text-2xl
              lg:text-3xl
              xl:text-3xl
              ${className}
            `}
            style={{ color: corTitulo }}
          >
            {titulo}
          </h1>

          {children ? (
            <div 
            className="
              mt-8 
              text-center 
              text-lg
              font-bold 
              text-black 
              md:text-2xl
              lg:text-2xl
              xl:text-2.5xl
              flex flex-col
              gap-4"
            >
              {children}
            </div>
          ) : (
            <p
            className="
              mt-8
              text-center
              text-lg
              font-bold
              text-black
              md:text-2xl
              lg:text-2.5xl
              xl:text-xl
            "
          >
            {descricao}
          </p>
          )}

          <div className="mt-10 flex justify-center">
            <button
              onClick={fechar}
              className="
                w-full
                max-w-[220px]
                rounded-full
                py-3
                text-2xl
                font-bold
                text-white
                shadow-[0_3px_5px_rgba(0,0,0,0.25)]
                transition-all
                hover:scale-105
              "
              style={{ backgroundColor: corBotao }}
            >
              {textoBotao}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}