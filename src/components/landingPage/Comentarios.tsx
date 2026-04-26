import { useState, useEffect } from "react";

const comentarios = [
    "Seria bom mais gente participar",
    "Não conhecia antes, achei interessante até",
    "Acho que mais gente deveria conhecer isso",
    "Curti, principalmente a proposta geral",
    "Dá pra acompanhar os eventos fácil"
];

function Comentarios({ isAdmin = false }: any) {
    const [foco, setFoco] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
           setFoco((prev) => (prev + 1) % comentarios.length);
        }, 4000);
        return () => clearInterval(intervalo);
    }, []);

    const texto1 = comentarios[foco];
    const texto2 = comentarios[(foco + 1) % comentarios.length];
    const texto3 = comentarios[(foco + 2) % comentarios.length];
    
    const visual = [
        "z-30 scale-100 opacity-100",
        "z-20 scale-95 opacity-60 translate-y-4",
        "z-10 scale-90 opacity-30 translate-y-8",
    ];

    const itens = [
        { id: foco, txt: texto1, estilo: visual[0] },
        { id: (foco + 1), txt: texto2, estilo: visual[1] },
        { id: (foco + 2), txt: texto3, estilo: visual[2] },
    ];


    return (
        <div className="relative lg:absolute lg:right-10 xl:right-28 lg:bottom-10 xl:bottom-20 w-full max-w-[320px] md:max-w-[300px] h-[160px] z-40 ml-auto md:mr-0 mr-4 my-8 lg:my-0">
            {itens.map((item) => (
                <div 
                    key={item.id} 
                    className={`absolute inset-0 p-5 md:p-6 rounded-3xl md:rounded-4xl text-white bg-black/40 border border-[#727272]/70 backdrop-blur-md transition-all duration-1000 ease-in-out ${item.estilo}`}
                >
                    <p className="italic text-base md:text-xl">"{item.txt}"</p>
                    <p className="mt-2 md:mt-3 text-sm md:text-lg font-semibold text-gray-400"> - Aluno(a) anônimo</p>
                </div>
            ))}
        </div>
    );
}


export default Comentarios;