import { Star } from "lucide-react";

export default function BarraPontos({ progresso }) {
  const pontos = [0, 20, 40, 60, 80, 100];

  return (
    <div className="w-[1610px] mx-auto bg-[#383636] rounded-full p-5">
      <div className="relative w-full bg-[#D3D3D3] rounded-full h-7 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] overflow-visible">
        <div
          className="absolute left-0 top-0 h-7 bg-[#71CFFF] rounded-full transition-all duration-500 shadow-md z-0"
          style={{ width: `${progresso}%` }}
        />
        {pontos.map((pos, index) => {
          const isPrimeira = index === 0;
          const isUltima = index === pontos.length - 1;
          return (
            <div
              key={index}
              className={`
                absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
                rounded-full bg-[#414141] shadow-lg
                flex items-center justify-center text-white z-10
                ${isPrimeira || isUltima ? "w-[80px] h-[80px] text-sm font-bold" : "w-[60px] h-[60px]"}
              `}
              style={{ left: `${pos}%` }}>
              {isPrimeira && (
                <span className="text-base md:text-xl font-black font-montserrat text-[#CCCCCC] leading-none">
                    1x
                </span>
                )}
              {!isPrimeira && !isUltima && (
                <Star className="w-8 h-8 text-[#FFDE59] fill-[#FFDE59]" />
              )}
              {isUltima && (
                <div className="flex gap-1">
                  <Star className="w-5 h-5 text-[#30B0F2] fill-[#30B0F2]" />
                  <Star className="w-7 h-7 text-[#FFDE59] fill-[#FFDE59]" />
                  <Star className="w-5 h-5 text-[#E34747] fill-[#E34747]" />
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}