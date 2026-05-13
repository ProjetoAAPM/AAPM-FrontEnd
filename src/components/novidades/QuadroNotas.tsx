import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";

function QuadroNotas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(
        window.innerWidth < 640 ||
        (window.innerWidth >= 768 && window.innerWidth < 1536)
      );
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const basePosts = [
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#6196C0]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C0BD61]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" },
    { cor: "bg-[#C06161]", texto: "" }
  ];

  const posts = isMobile
    ? [...basePosts, { cor: "bg-[#6196C0]", texto: "" }]
    : basePosts;

  return (
    <div className="w-full flex flex-col items-center">

      <div className="self-start bg-[#14358F] text-white text-[1rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.3rem] xl:text-[3.1rem] 2xl:text-[3.3rem] font-black px-[80px] sm:px-[150px] md:px-[150px] lg:px-[250px] xl:px-[300px] 2xl:px-[350px] rounded-r-[10px] shadow-md mb-3 py-2">
        Quadro de Notas
      </div>

      <div
        className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[700px] xl:w-[950px] 2xl:w-[1350px] h-[1250px] sm:h-[950px] md:h-[850px] lg:h-[850px] xl:h-[1100px] 2xl:h-[1000px] bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center p-10"
        style={{ backgroundImage: `url(${fundo})` }}
      >

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 md:gap-6 lg:gap-7 xl:gap-10 2xl:gap-12 mt-[px] sm:mt-[20px] md:mt-[20px] lg:mt-[20px] xl:mt-[5px] 2xl:mt-[-50px]">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`w-[110px] sm:w-[130px] md:w-[140px] lg:w-[140px] xl:w-[190px] 2xl:w-[200px] aspect-square ${post.cor} shadow-md p-3 flex items-center justify-center text-center`}
            >
              <p className="text-black text-sm md:text-base font-medium break-words">
                {post.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 mt-4 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-15">

          <p className="bg-[#4A61A0] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] 2xl:px-[80px] text-white font-bold text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.6rem] xl:text-[2.2rem] 2xl:text-[2.5rem]">
            Legendas
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-3 md:gap-5 lg:gap-5 xl:gap-10 2xl:gap-15">

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#C06161] rounded-[3px]"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Eventos do SENAI
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#6196C0] rounded-sm"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Eventos Externos
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-[#C0BD61] rounded-sm"></div>
              <p className="bg-[#B9B9B9] px-[25px] text-white text-sm sm:text-md md:text-lg lg:text-xl">
                Ações Governamentais
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default QuadroNotas;