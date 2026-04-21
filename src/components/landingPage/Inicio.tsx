import Comentarios from "../landingPage/Comentarios";

function Inicio() {
    return (
        <div className="relative min-h-screen flex flex-col items-center md:items-start overflow-hidden">

            <video src="src/assets/video/jundiai.mp4" autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"></video>

            <div className="absolute inset-0 bg-black/60 z-[-1]"></div>

            <div className="max-w-[1650px] w-full mx-auto px-10 md:px-20 pt-32 md:pt-[140px] lg:pt-[280px] pb-10 lg:pb-20">
                
                <h1 className="text-white text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                    Conectando alunos,
                    <br />
                    escola <span className="text-[#FFDB4B]">e comunidade</span>
                </h1>

                <p className="text-white text-base md:text-xl lg:text-3xl mt-4 max-w-3xl font-medium">
                    Faça parte de projetos que transformam o Senai em
                    <br className="hidden md:block" />
                    um lugar ainda melhor para aprender e crescer
                </p>
                
                <p className="text-white text-base md:text-xl lg:text-2xl mt-4 opacity-90">
                    Pequenas ações que melhoram a vida do aluno
                </p>

                <button onClick={() => {
                    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center bg-[#C83D3D] rounded-full md:w-[194px] h-[48px] px-10 py-1 text-white text-lg font-semibold mt-10 cursor-pointer shadow-lg hover:bg-[#b03535] transition-all">
                    Conheça Mais
                </button>

                <div className="mt-10">
                    <Comentarios />
                </div>
            </div>
        </div>
    );
}

export default Inicio;