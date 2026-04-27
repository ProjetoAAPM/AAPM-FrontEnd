import "../Scrollbar/scrollbar.css";

export default function FormularioExtrato() {
  return (
    <div className="w-full max-w-[1890px] mx-auto px-6 md:px-10">
      <div className="flex flex-col lg:flex-row gap-3 h-[93vh]">
        <div className="bg-[#DDF4FF] w-full lg:w-3/4 h-[93vh] rounded-[15px] shadow-2xl overflow-hidden flex flex-col px-10 py-6 relative">
          <div className="absolute top-10 left-0 bg-[#FFFFFF] text-[#101625] text-[3rem] font-black px-[450px] py-1 rounded-r-[10px] shadow-md">
            Formulários
          </div>
          <div className="mt-[120px] bg-white flex-1 rounded-[10px] shadow-md overflow-y-auto p-4 scroll-modern">
            <div className="h-[1500px]">
              Conteúdo do formulário aqui...
            </div>
          </div>
        </div>
        <div className="bg-[#BBE1FE] w-full lg:w-1/4 h-[93vh] rounded-[15px] shadow-2xl px-10 overflow-y-auto">
        </div>

      </div>

    </div>
  );
}