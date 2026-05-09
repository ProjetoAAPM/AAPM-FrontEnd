import fundo from "../../assets/images/FundoNotas.png";
import { useEffect, useState } from "react";

function QuadroNotas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
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
      
      <div className="self-start bg-[#14358F] text-white text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-black px-[120px] sm:px-[200px] md:px-[450px] rounded-r-[10px] shadow-md mb-3">
        Quadro de Notas
      </div>

      <div
        className="w-[95%] max-w-[1500px] min-h-[720px] bg-no-repeat bg-center bg-cover flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${fundo})` }}
      >

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12">
          {posts.map((color, i) => (
            <div
              key={i}
              className={`w-[130px] sm:w-[130px] md:w-[180px] aspect-square ${color} shadow-md`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default QuadroNotas;