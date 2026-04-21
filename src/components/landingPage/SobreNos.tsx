function SobreNos() {
    return (
        <div className="max-w-[1812px] m-auto py-12 px-4 md:px-10">
            
            <div className="bg-[#51AAD8] py-2 mb-10 rounded-md">
                <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold italic">
                    Sobre Nós
                </h2>
            </div>


            <div className="bg-[#182033] h-auto p-6 md:p-10 rounded-lg">
                
                <div className="mb-8 md:mx-20 lg:mx-30 text-white">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
                        Origem
                    </h3>

                    <p className="leading-relaxed text-gray-200 text-lg md:text-xl lg:text-2xl">
                        Surgimos tendo em vista a necessidade de criar uma relação mais próxima entre a escola técnica e a comunidade local, envolvendo os pais e alunos no cotidiano escolar. Temos como objetivo 
                        <span className="font-semibold text-white"> enriquecer</span> a formação dos alunos e 
                        <span className="font-semibold text-white"> oferecer</span> suporte administrativo e financeiro para atividades que vão além do currículo obrigatório. 
                    </p>
                </div>

                <div className="mb-8 md:mx-20 lg:mx-30 text-white">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 underline decoration-2 decoration-[#EFBF04] underline-offset-8">
                        Apoio ao Aluno
                    </h3>

                    <ul className="list-disc list-inside space-y-3 text-gray-200 text-lg md:text-xl lg:text-2xl">
                        <li>
                            <span className="font-semibold text-white">Suporte financeiro</span>, empréstimo de armários, e acesso a ferramentas de lazer e esportes.
                        </li>
                        <li>Eventos, formaturas, feiras de tecnologia e confraternizações.</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-[1150px] m-auto">

                    <div className="hidden md:block border-2 border-white p-2 rounded-sm overflow-hidden shadow-lg transition-transform hover:scale-105 aspect-video">
                        <img src="src/assets/images/futsal.jpg" alt="alunos na quadra" className="w-full h-full object-cover"/>
                    </div>

                    <div className="border-2 border-white p-2 rounded-sm overflow-hidden shadow-lg transition-transform hover:scale-105 aspect-video">
                        <img src="src/assets/images/fotoGrupo.jpg" alt="foto em grupo" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SobreNos;