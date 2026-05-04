import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import img1 from "../../assets/images/DesafioIdeiaspessoas.jpg";
import img2 from "../../assets/images/medalhasSenai.jpg";
import img3 from "../../assets/images/formatura.png";
import img4 from "../../assets/images/quadraSenai.jpg";
import img5 from "../../assets/images/DesafioIdeias.jpg";
import img6 from "../../assets/images/auditorio.jpg";
import img7 from "../../assets/images/carros.jpg";

const slides = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
];

const Carrossel: React.FC = () => {
  const [index, setIndex] = useState(0);

  function proximo() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function anterior() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    const interval = setInterval(proximo, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen relative overflow-hidden">

      <div
        className="flex transition-transform duration-700 h-full will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
        >
        {slides.map((img, i) => (
          <img
            key={i}
            src={img}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-1 py-1 rounded-full"
      >
        <ArrowLeft></ArrowLeft>
      </button>
      <button
        onClick={proximo}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full"
      >
        <ArrowRight></ArrowRight>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Carrossel;