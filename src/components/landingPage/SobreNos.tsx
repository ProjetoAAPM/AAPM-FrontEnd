import EditorCK from "../admin/EditorCK";
import IconeEditar from "../../assets/images/icone_editar.png";

function SobreNos({ isAdmin, isEditing, content, setContent, handleImageUpload }: any) {
  return (
    <div className="max-w-[1812px] m-auto py-12 px-4 md:px-10">
      <div className="bg-[#51AAD8] py-2 mb-10 rounded-md">
        <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold italic">
          Sobre Nós
        </h2>
      </div>

      <div className="bg-[#182033] h-auto p-6 md:p-10 rounded-lg">
        <div className={isAdmin && isEditing ? "border-2 border-dashed border-blue-500 p-4 rounded-lg" : ""}>
          {isAdmin && isEditing ? (
            <EditorCK
              isEditing
              initialData={content.sobre.html ||
                `<div class="mb-8 md:mx-20 lg:mx-30 text-white">
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
                    <li>Suporte financeiro, empréstimo de armários, e acesso a ferramentas de lazer e esportes.</li>
                    <li>Eventos, formaturas, feiras de tecnologia e confraternizações.</li>
                  </ul>
                </div>`
              }
              onChange={(v: any) => setContent({
                ...content,
                sobre: { ...content.sobre, html: v }
              })}
              className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: content?.sobre?.html ||
                  `<div class="mb-8 md:mx-20 lg:mx-30 text-white">
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
                      <li>Suporte financeiro, empréstimo de armários, e acesso a ferramentas de lazer e esportes.</li>
                      <li>Eventos, formaturas, feiras de tecnologia e confraternizações.</li>
                    </ul>
                  </div>`
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-[1150px] m-auto">
          {[
            { key: "foto1", default: "src/assets/images/futsal.jpg" },
            { key: "foto2", default: "src/assets/images/fotoGrupo.jpg" }
          ].map((item) => (
            <div key={item.key} className="relative group border-2 border-white p-2 rounded-sm overflow-hidden shadow-lg transition-transform hover:scale-105 aspect-video">
              <label className={`w-full h-full block ${isAdmin && isEditing ? 'cursor-pointer' : ''}`}>
                <img 
                  src={content?.sobre?.[item.key] || item.default} 
                  alt={`alunos da AAPM Senai`} 
                  className="w-full h-full object-cover" 
                />
                {isAdmin && isEditing && (
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#C83D3D] hover:bg-[#a02c2c] text-white px-3 py-1.5 rounded-full shadow-2xl transition-all z-30">
                    <img src={IconeEditar} alt="Editar" className="w-4 h-4 brightness-0 invert" /> 
                    <span className="text-xs font-bold uppercase tracking-wider">Alterar Foto</span>
                  </div>
                )}
                {isAdmin && isEditing && (
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, item.key)}
                  />
                )}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SobreNos;
