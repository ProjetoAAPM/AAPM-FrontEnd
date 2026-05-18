import "../Scrollbar/scrollbar.css";

export default function FormularioExtrato({ extrato = [] }) {
  return (
    <div className="w-full max-w-[1800px] mx-auto overflow-x-hidden">

      <div
        className="
          flex
          flex-col
          lg:flex-row

          gap-3

          lg:h-[95vh]
        "
      >

        {/* FORMULÁRIO */}
        <div
          className="
            bg-[#DDF4FF]

            w-full
            lg:w-3/4

            h-[650px]
            sm:h-[700px]
            lg:h-[95vh]

            rounded-[15px]
            shadow-2xl

            flex
            flex-col

            px-4
            sm:px-6
            md:px-10

            py-6

            relative
            overflow-hidden
          "
        >

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
            Formulários
          </div>

          <div
            className="
              mt-[80px]
              sm:mt-[100px]
              md:mt-[120px]

              bg-white

              flex-1

              rounded-[10px]
              shadow-md

              overflow-y-auto
              scroll-modern

              min-h-0
            "
          >
            <div className="min-h-[600px] md:h-[1500px]">
              Conteúdo do formulário aqui...
            </div>
          </div>

        </div>

        {/* EXTRATO */}
        <div
          className="
            bg-[#BBE1FE]

            w-full
            lg:w-1/4

            min-h-[400px]
            sm:min-h-[500px]
            lg:h-full

            rounded-[15px]
            shadow-2xl

            p-3
            sm:p-4

            relative
            flex
            flex-col

            overflow-hidden
          "
        >

          <div
            className="
              absolute

              top-6
              sm:top-10

              right-0

              bg-white
              text-[#101625]

              text-[1.2rem]
              min-[350px]:text-[1.4rem]
              sm:text-[2rem]
              md:text-[1.5rem]

              font-black

              px-6
              min-[20px]:px-16
              sm:px-[100px]
              md:px-[200px]
              lg:px-[90px]

              py-1

              rounded-l-[10px]
              shadow-md

              whitespace-nowrap
            "
          >
            Extrato
          </div>

          <div
            className="
              mt-[80px]
              sm:mt-[110px]
              md:mt-[130px]

              flex-1

              rounded-[10px]

              bg-[#BBE1FE]

              overflow-hidden

              min-h-0
            "
          >

            <div
              className="
                h-full
                overflow-y-auto

                scroll-modern

                pr-2
                sm:pr-3
              "
            >

              <div className="p-2 sm:p-4 space-y-3">

                {extrato.map((item, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#FFFFFF]

                      rounded-[8px]

                      p-3

                      shadow-sm

                      flex
                      justify-between
                      items-center

                      gap-3
                    "
                  >

                    {item.tipo === "premio" && (
                      <div>
                        <p className="text-[12px] sm:text-[14px] font-semibold text-yellow-700">
                          Prêmio desbloqueado
                        </p>

                        <p className="text-[13px] sm:text-[15px] font-bold text-black">
                          {item.premio}
                        </p>
                      </div>
                    )}

                    <div className="flex-1">

                      {item.tipo === "pontos" && (
                        <div className="flex flex-col">

                          <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">
                            Ganho de pontos
                          </p>

                          <p
                            className="
                              text-[13px]
                              sm:text-[15px]

                              font-bold
                              text-black

                              break-words
                            "
                          >
                            {item.mensagem || item.descricao}
                          </p>

                          <span
                            className="
                              text-green-600
                              font-bold

                              text-[13px]
                              sm:text-[15px]

                              mt-1
                            "
                          >
                            +{item.valor || item.pontos} pts
                          </span>

                        </div>
                      )}

                      {item.tipo === "resgate" && (
                        <>
                          <p className="text-[12px] sm:text-[14px] font-semibold text-gray-700">
                            Reivindicação de pontos
                          </p>

                          <p className="text-[12px] sm:text-[14px] text-gray-400 font-semibold">
                            Brinde: {item.premio}
                          </p>
                        </>
                      )}

                    </div>

                    <div className="shrink-0">

                      {item.tipo === "resgate" && (
                        <span className="text-gray-400 text-lg sm:text-xl">
                          ⭐
                        </span>
                      )}

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}