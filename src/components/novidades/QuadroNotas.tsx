import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";

function QuadroNotas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
setIsMobile(
  window.innerWidth < 640 ||
  (window.innerWidth >= 768 && window.innerWidth < 1536)
);    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const basePosts = [
    { cor: "bg-[#C0BD61]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""},
    { cor: "bg-[#6196C0]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""},
    { cor: "bg-[#C0BD61]", texto: ""},
    { cor: "bg-[#6196C0]", texto: ""},
    { cor: "bg-[#6196C0]", texto: ""},
    { cor: "bg-[#C0BD61]", texto: ""},
    { cor: "bg-[#6196C0]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""},
    { cor: "bg-[#C0BD61]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""},
    { cor: "bg-[#C0BD61]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""},
    { cor: "bg-[#C06161]", texto: ""}
  ];


  const posts = isMobile ? [...basePosts,{ cor: "bg-[#6196C0]", texto: "" }] : basePosts;

  return (
    <div className="w-full flex flex-col items-center">
      
      <div className="self-start bg-[#14358F] text-white text-[1rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.3rem] xl:text-[3.1rem] 2xl-[4rem] font-black px-[80px] sm:px-[150px] md:px-[150px] lg:px-[250px] xl:px-[300px] 2xl:px-[350px] rounded-r-[10px] shadow-md mb-3 py-2">
        Quadro de Notas
      </div>

      <div
        className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[700px] xl:w-[950px] 2xl:w-[1350px] h-[1350px] sm:h-[950px] md:h-[850px] lg:h-[850px] xl:h-[1200px] 2xl:h-[1080px] bg-no-repeat bg-center bg-cover flex items-center justify-center p-10"
          style={{ backgroundImage: `url(${fundo})` }}
      >

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 md:gap-6 lg:gap-7 xl:gap-10 2xl:gap-12 mt-[-200px] sm:mt-[-120px] md:mt-[-180px] lg:mt-[-180px] xl:mt-[-250px] 2xl:mt-[-280px]">
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

      </div>
    </div>
  );
}

export default QuadroNotas;