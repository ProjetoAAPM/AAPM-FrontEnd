import { useRef, useState, useEffect } from "react";
import BlocoEditavel from "../admin/BlocoEditavel";
import { useEditMode } from "../../contexts/modo_editar";
import iconeEditar from "../../assets/icons/icone_editar.png";

function SobreNos() {
  const { editMode } = useEditMode();

  const [imgFutsal, setImgFutsal] = useState("src/assets/images/futsal.jpg");
  const [imgGrupo, setImgGrupo] = useState("src/assets/images/fotoGrupo.jpg");
  const [conteudoEditado, setConteudoEditado] = useState<string | null>(null);

  useEffect(() => {
    const sFutsal = localStorage.getItem("img-futsal");
    const sGrupo = localStorage.getItem("img-grupo");
    const sText = localStorage.getItem("sobre-texto");

    if (sFutsal) setImgFutsal(sFutsal);
    if (sGrupo) setImgGrupo(sGrupo);
    setConteudoEditado(sText);
  }, [editMode]);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleImageClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (editMode) ref.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        localStorage.setItem(`img-${id}`, base64);
        if (id === "futsal") setImgFutsal(base64);
        if (id === "grupo") setImgGrupo(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const SOBRE_PADRAO = `
    <div class="mb-8 md:mx-20 lg:mx-30 text-white">
      <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
        Origem
      </h3>

      <p class="leading-relaxed text-gray-200 text-lg md:text-xl lg:text-2xl">
        Surgimos tendo em vista a necessidade de criar uma relação mais próxima entre a escola técnica e a comunidade local, envolvendo os pais e alunos no cotidiano escolar. Temos como objetivo 
        <span class="font-semibold text-white"> enriquecer</span> a formação dos alunos e 
        <span class="font-semibold text-white"> oferecer</span> suporte administrativo e financeiro para atividades que vão além do currículo obrigatório. 
      </p>
    </div>

    <div class="mb-8 md:mx-20 lg:mx-30 text-white">
      <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
        Apoio ao Aluno
      </h3>

      <ul class="list-disc list-inside space-y-3 text-gray-200 text-lg md:text-xl lg:text-2xl">
        <li>
          <span class="font-semibold text-white">Suporte financeiro</span>, empréstimo de armários, e acesso a ferramentas de lazer e esportes.
        </li>
        <li>Eventos, formaturas, feiras de tecnologia e confraternizações.</li>
      </ul>
    </div>
  `;

  return (
    <div className="max-w-[1812px] m-auto py-12 px-4 md:px-10">
      <div className="bg-[#51AAD8] py-2 mb-10 rounded-md">
        <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold italic">
          Sobre Nós
        </h2>
      </div>

      <div className="bg-[#182033] h-auto p-6 md:p-10 rounded-lg">
        <div className="sobre-nos-wrapper relative">
          <div className="mb-8 md:mx-20 text-white">

            {editMode ? (
              <div className="relative">
                <BlocoEditavel
                  id="sobre-texto"
                  content={conteudoEditado || SOBRE_PADRAO}
                />

                <div className="absolute top-4 right-4">
                  <img 
                    src={iconeEditar}
                    alt="Editar" 
                    className="w-7 h-7" 
                  />
                </div>
              </div>
            ) : (
              <div
                className="conteudo-renderizado text-white"
                dangerouslySetInnerHTML={{
                  __html: conteudoEditado || SOBRE_PADRAO
                }}
              />
            )}

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 w-full max-w-[1200px] m-auto">
          
          <div className="relative">
            <div
              onClick={() => handleImageClick(fileInputRef1)}
              className={`relative border-2 p-2 rounded-sm overflow-hidden shadow-lg transition-transform aspect-video
                ${editMode ? 'border-blue-400 border-dashed' : 'border-white hover:scale-105'}`}
            >
              <img src={imgFutsal} alt="alunos na quadra" className="w-full h-full object-cover" />
            </div>

            {editMode && (
              <div className="absolute top-4 right-4">
                <img src="/src/assets/icons/icone_editar.png" alt="Editar" className="w-7 h-7" />
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef1} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, "futsal")} 
            />
          </div>

          <div className="relative">
            <div
              onClick={() => handleImageClick(fileInputRef2)}
              className={`relative border-2 p-2 rounded-sm overflow-hidden shadow-lg transition-transform aspect-video
                ${editMode ? 'border-blue-400 border-dashed' : 'border-white hover:scale-105'}`}
            >
              <img src={imgGrupo} alt="foto em grupo" className="w-full h-full object-cover" />
            </div>

            {editMode && (
              <div className="absolute top-4 right-4">
                <img src="/src/assets/icons/icone_editar.png" alt="Editar" className="w-7 h-7" />
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef2} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, "grupo")} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default SobreNos;