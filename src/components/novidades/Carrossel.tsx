import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import img1 from "../../assets/images/DesafioIdeiaspessoas.jpg";
import img2 from "../../assets/images/medalhasSenai.jpg";
import img3 from "../../assets/images/formatura.png";
import img4 from "../../assets/images/quadraSenai.jpg";
import img5 from "../../assets/images/DesafioIdeias.jpg";
import img6 from "../../assets/images/auditorio.jpg";
import img7 from "../../assets/images/carros.jpg";

import { useEditMode } from "../../contexts/modo_editar";

const initialSlides = [img1, img2, img3, img4, img5, img6, img7];

const Carrossel: React.FC = () => {

  const { editMode } = useEditMode();

  const [slides, setSlides] = useState<string[]>(initialSlides);

  const [index, setIndex] = useState(0);

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

    localStorage.setItem(
      "carrossel-slides",
      JSON.stringify(newSlides)
    );

    setSlides(newSlides);
  };

  function proximo() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function anterior() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

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

    <div
      className="
      w-full
      h-[35vh]
      sm:h-[45vh]
      md:h-[60vh]
      lg:h-[80vh]
      xl:h-[100vh]
      2xl:h-[100vh]
      relative overflow-hidden"
    >

      <div
        className="flex transition-transform duration-700 h-full will-change-transform"
        style={{
          transform: `translateX(-${index * 100}%)`
        }}
      >

        {slides.map((img, i) => (

          <div
            key={i}
            className="relative w-full h-full flex-shrink-0"
          >

            <img
              src={img}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />

            {editMode && (

              <div
                onClick={() => handleImageChange(i)}
                className="
                absolute inset-0
                bg-black/50
                flex items-center justify-center
                cursor-pointer
                border-2 border-dashed border-blue-400
                hover:border-blue-300
                transition-colors"
              >

                <img
                  src="/src/assets/icons/icone_editar.png"
                  alt="Editar"
                  className="
                  w-8 h-8
                  sm:w-9 sm:h-9
                  md:w-10 md:h-10
                  lg:w-10 lg:h-10
                  xl:w-12 xl:h-12"
                />

              </div>
            )}

          </div>
        ))}

      </div>

      <button
        onClick={anterior}
        className="
        absolute
        left-2
        sm:left-3
        md:left-4
        lg:left-5
        xl:left-6
        2xl:left-8
        top-1/2 -translate-y-1/2
        bg-black/40 hover:bg-black/60
        text-white
        p-1
        sm:p-2
        md:p-2
        lg:p-2
        xl:p-2
        2xl:p-2
        rounded-full
        transition"
      >

        <ArrowLeft
          className="
          w-4 h-4
          sm:w-5 sm:h-5
          md:w-6 md:h-6
          lg:w-7 lg:h-7
          xl:w-8 xl:h-8
          2xl:w-10 2xl:h-10"
        />

      </button>

      <button
        onClick={proximo}
        className="
        absolute
        right-2
        sm:right-3
        md:right-4
        lg:right-5
        xl:right-6
        2xl:right-8
        top-1/2 -translate-y-1/2
        bg-black/40 hover:bg-black/60
        text-white
        p-1
        sm:p-2
        md:p-2
        lg:p-2
        xl:p-2
        2xl:p-2
        rounded-full
        transition"
      >

        <ArrowRight
          className="
          w-4 h-4
          sm:w-5 sm:h-5
          md:w-6 md:h-6
          lg:w-7 lg:h-7
          xl:w-8 xl:h-8
          2xl:w-10 2xl:h-10"
        />

      </button>

      <div
        className="
        absolute
        bottom-3
        sm:bottom-4
        md:bottom-5
        lg:bottom-6
        xl:bottom-8
        2xl:bottom-5
        left-1/2 -translate-x-1/2
        flex
        gap-1
        sm:gap-2
        md:gap-3
        lg:gap-3
        xl:gap-4
        2xl:gap-5"
      >

        {slides.map((_, i) => (

          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`
              cursor-pointer rounded-full transition-all

              w-2 h-2
              sm:w-2 sm:h-2
              md:w-3 md:h-3
              lg:w-3 lg:h-3
              xl:w-4 xl:h-4
              2xl:w-4 2xl:h-4

              ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/50"
              }
            `}
          />

        ))}

      </div>

    </div>
  );
};

export default Carrossel;