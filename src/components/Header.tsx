import { Link } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* O container agora é fixo no topo (mt-0) e sem padding lateral (px-0) em mobile/tablet */}
            {/* As margens e o arredondamento só aparecem em 'lg' (telas cheias) */}
            <div className={`absolute w-full flex justify-center z-50 transition-all duration-300 
                ${isOpen ? 'mt-0 px-0' : 'mt-0 px-0 lg:mt-4 lg:px-10'}`}>
                
                <div className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300
                    ${isOpen 
                        ? 'bg-[#FFD44B] rounded-none' 
                        : 'bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-lg'}`}>

                    <div className="flex items-center gap-2 md:gap-3">
                        <img src="src/assets/icons/Logo48.svg" alt="Logo" className="h-[40px] md:h-[45px] w-auto object-contain"/>
                        <p className={`text-sm md:text-xl font-semibold whitespace-nowrap leading-tight transition-colors ${isOpen ? 'text-black' : 'text-white'}`}>
                            AAPM Senai Leopoldina
                        </p>
                    </div>

                    <div className="hidden lg:flex gap-10 xl:gap-28 text-white text-lg font-medium">
                        <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/novidades" className="hover:text-gray-300 transition-colors">Novidades</Link>
                        <Link to="/pagamento" className="hover:text-gray-300 transition-colors">Pagamento</Link>
                    </div>

                    <div className="flex gap-2 md:gap-6 items-center">
                        <Link to="/login" className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                        text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                            Login
                        </Link>

                        <div className={`hidden lg:block w-[2px] h-8 ${isOpen ? 'bg-black/20' : 'bg-gray-500/50'}`}></div>

                        <Link to="/cadastro" className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                        text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                            Cadastrar
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[60]"
                        >
                            <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 bg-black' : 'bg-white'}`}></span>
                            <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'opacity-0' : 'bg-white'}`}></span>
                            <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 bg-black' : 'bg-white'}`}></span>
                        </button>
                    </div>
                </div>
            </div>

            <MenuMobile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    );
}

export default Header;