import { Link } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [perfilOpen, setPerfilOpen] = useState(false);

const [usuario, setUsuario] = useState({
    nome: "Maysa",
    foto: "https://i.pravatar.cc/150?img=32"
});

    return (
        <>
            <div className={`absolute w-full flex justify-center z-50 transition-all duration-300 
                ${isOpen ? 'mt-0 px-0' : 'mt-0 px-0 lg:mt-4 lg:px-10'}`}>
                
                <div className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300
                    ${isOpen 
                        ? 'fixed bg-[#FFD44B] rounded-none' 
                        : 'bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)]'}`}>

                    <div className="flex items-center gap-2 md:gap-3">
                        <img src="src/assets/icons/Logo48.svg" alt="Logo" className="h-[40px] md:h-[45px] w-auto object-contain"/>
                        <p className={`text-sm md:text-xl font-semibold whitespace-nowrap leading-tight transition-colors ${isOpen ? 'text-black' : 'text-white'}`}>
                            AAPM Senai Leopoldina
                        </p>
                    </div>

                    <div className="hidden lg:flex gap-10 xl:gap-28 text-white text-lg font-medium">
                        <Link to="/home" className="hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/novidades" className="hover:text-gray-300 transition-colors">Novidades</Link>
                        <Link to="/pagamento" className="hover:text-gray-300 transition-colors">Pagamento</Link>
                    </div>

                    <div className="flex gap-2 md:gap-6 items-center">
                        {usuario ? (
                            <div
                                onClick={() => setPerfilOpen(true)}
                                className="hidden lg:flex items-center gap-3 cursor-pointer">
                                <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                                    <img
                                        src={usuario.foto}
                                        alt="Foto do usuário"
                                        className="w-11 h-11 rounded-full object-cover bg-[#171717]"
                                    />
                                </div>
                                <p className="text-white font-medium text-lg hover:text-gray-300 transition-colors">
                                    {usuario.nome}
                                </p>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                                    text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                                    Login
                                </Link>
                                <div className={`hidden lg:block w-[2px] h-8 ${isOpen ? 'bg-black/20' : 'bg-gray-500/50'}`}></div>
                                <Link
                                    to="/cadastro"
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full w-[160px] h-[42px] 
                                    text-white shadow-lg text-lg font-semibold hover:bg-[#b03535] transition-all">
                                    Cadastrar
                                </Link>
                            </>
                        )}
                        <div className="flex items-center gap-3 lg:hidden">
                            {usuario && (
                                <button
                                    onClick={() => setPerfilOpen(true)}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
                                >
                                 <div className="rounded-full bg-gradient-to-r from-[#1D2235] via-[#4B4D57] to-[#1F2A33] hover:scale-105 transition-transform">
                                    <img
                                        src={usuario.foto}
                                        alt="Foto do usuário"
                                        className="w-11 h-11 rounded-full object-cover bg-[#171717]"
                                    />
                                </div>
                                </button>
                            )}

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[60]"
                            >
                                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 bg-black' : 'bg-white'}`}></span>
                                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? 'opacity-0' : 'bg-white'}`}></span>
                                <span className={`h-0.5 w-6 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 bg-black' : 'bg-white'}`}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MenuMobile
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                usuario={usuario}
                />
            <ModalPerfil
                perfilOpen={perfilOpen}
                setPerfilOpen={setPerfilOpen}
                usuario={usuario}
            />
        </>
    );
}

export default Header;