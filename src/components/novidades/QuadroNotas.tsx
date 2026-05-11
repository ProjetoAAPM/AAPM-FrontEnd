import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";

function QuadroNotas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const basePosts = [
    "bg-[#C0BD61]",
    "bg-[#C06161]",
    "bg-[#6196C0]",
    "bg-[#C06161]",
    "bg-[#C0BD61]",
    "bg-[#6196C0]",
    "bg-[#6196C0]",
    "bg-[#C0BD61]",
    "bg-[#6196C0]",
    "bg-[#C06161]",
    "bg-[#C0BD61]",
    "bg-[#C06161]",
    "bg-[#C0BD61]",
    "bg-[#C06161]",
    "bg-[#C06161]"
  ];

  const posts = isMobile ? [...basePosts, "bg-[#6196C0]"] : basePosts;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="self-start bg-[#14358F] text-white font-black text-[1.2rem] sm:text-[2rem] md:text-[3rem] px-10 sm:px-[200px] md:px-[400px] rounded-r-md mb-3">
        Quadro de Notas
      </div>

      <div
        className="w-[95%] max-w-[1500px] min-h-[400px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[720px] bg-cover bg-center flex items-center justify-center p-2 sm:p-4"
        style={{ backgroundImage: `url(${fundo})` }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 md:gap-10">
          {posts.map((color, i) => (
            <div
              key={i}
              className={`w-[70px] sm:w-[120px] md:w-[150px] lg:w-[180px] aspect-square ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuadroNotas;