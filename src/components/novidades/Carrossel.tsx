import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import img1 from "../../assets/images/DesafioIdeiaspessoas.jpg";
import img2 from "../../assets/images/medalhasSenai.jpg";
import img3 from "../../assets/images/formatura.png";
import img4 from "../../assets/images/quadraSenai.jpg";
import img5 from "../../assets/images/DesafioIdeias.jpg";
import img6 from "../../assets/images/auditorio.jpg";
import img7 from "../../assets/images/carros.jpg";

import { useEditMode } from "../../context_admin/modo_editar";   // ajuste o caminho se necessário

const initialSlides = [img1, img2, img3, img4, img5, img6, img7];

const Carrossel: React.FC = () => {
  const { editMode } = useEditMode();
  
  const [slides, setSlides] = useState<string[]>(initialSlides);

  useEffect(() => {
    const savedSlides = localStorage.getItem("carrossel-slides");
    if (savedSlides) {
      try {
        const parsed = JSON.parse(savedSlides);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        }
      } catch (e) {
        console.error("Erro ao carregar slides do localStorage");
      }
    }
  }, [editMode]);

  const saveToLocalStorage = (newSlides: string[]) => {
    localStorage.setItem("carrossel-slides", JSON.stringify(newSlides));
    setSlides(newSlides);
  };

  function proximo() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function anterior() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(proximo, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleImageChange = (position: number) => {
    if (!editMode) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const newSlides = [...slides];
        newSlides[position] = base64;
        saveToLocalStorage(newSlides);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen relative overflow-hidden">

      <div
        className="flex transition-transform duration-700 h-full will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((img, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <img
              src={img}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />

            {editMode && (
              <div 
                onClick={() => handleImageChange(i)}
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-400 hover:border-blue-300 transition-colors"
              >
                <div>
                  <img 
                    src="/src/assets/images/icone_editar.png" 
                    alt="Editar" 
                    className="w-10 h-10" 
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ArrowLeft size={28} />
      </button>

      <button
        onClick={proximo}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ArrowRight size={28} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrossel;
