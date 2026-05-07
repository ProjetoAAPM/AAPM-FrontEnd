import { Link, useLocation } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import { useState } from "react";
import { useEditMode } from "../context_admin/modo_editar";
import logoImg from "/src/assets/icons/Logo48.svg";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { editMode, setEditMode } = useEditMode();
    const location = useLocation();

    const isAdmin = location.pathname.startsWith("/admin");

    const resetarPadrao = () => {
        if (window.confirm("Deseja voltar ao texto e imagens padrão originais?")) {
            localStorage.removeItem("inicio-texto");
            localStorage.removeItem("sobre-texto");
            localStorage.removeItem("img-futsal");
            localStorage.removeItem("img-grupo");
            
            localStorage.removeItem("jornal-img1");
            localStorage.removeItem("jornal-img2");
            localStorage.removeItem("jornal-img3");
            localStorage.removeItem("jornal-img4");
            localStorage.removeItem("jornal-texto-col1");
            localStorage.removeItem("jornal-texto-col2");
            localStorage.removeItem("jornal-texto-col3-1");
            localStorage.removeItem("jornal-texto-col3-2");

            // Carrossel
            localStorage.removeItem("carrossel-slides");




            setEditMode(false);
            window.location.reload();
        }
    };

    return (
        <>
            <div className={`absolute w-full flex justify-center z-50 transition-all duration-300 
                ${isOpen ? 'mt-0 px-0' : 'mt-0 px-0 lg:mt-4 lg:px-10'}`}>
                
                <div className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300
                    ${isOpen 
                        ? 'bg-[#FFD44B] rounded-none' 
                        : 'bg-[#211F1D]/80 backdrop-blur-lg rounded-none lg:rounded-full shadow-lg'}`}>

                    <div className={`flex items-center ${isAdmin ? "gap-2" : "gap-2 md:gap-3"}`}>
                        <img 
                            src={logoImg}
                            alt="Logo" 
                            className="h-[40px] md:h-[45px] w-auto object-contain"
                        />
                        <p className={`text-sm md:text-xl font-semibold whitespace-nowrap leading-tight transition-colors ${isOpen ? 'text-black' : 'text-white'}`}>
                            AAPM Senai Leopoldina
                        </p>
                    </div>

                    <div className={`hidden lg:flex items-center text-white font-medium 
                        ${isAdmin 
                            ? "gap-4 xl:gap-20 text-base xl:text-lg" 
                            : "gap-4 xl:gap-28 text-base xl:text-lg"}`}>

                        <Link 
                            to={isAdmin ? "/admin" : "/home"} 
                            className="hover:text-gray-300 transition-colors"
                        >
                            Home
                        </Link>

                        {isAdmin && (
                            <Link 
                                to="/admin/usuario" 
                                className="hover:text-gray-300 transition-colors"
                            >
                                Usuário
                            </Link>
                        )}

                        <Link 
                            to={isAdmin ? "/admin/novidades" : "/novidades"} 
                            className="hover:text-gray-300 transition-colors"
                        >
                            Novidades
                        </Link>

                        <Link 
                            to={isAdmin ? "/admin/pagamento" : "/pagamento"} 
                            className="hover:text-gray-300 transition-colors"
                        >
                            Pagamento
                        </Link>
                    </div>

                    <div className={`flex items-center ${isAdmin ? "gap-2 xl:gap-4" : "gap-2 md:gap-6"}`}>
                        {isAdmin ? (
                            <>
                                <button
                                    onClick={resetarPadrao}
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full h-[42px] text-white shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[130px] xl:w-[160px] text-base xl:text-lg"
                                >
                                    Padrao
                                </button>

                                <div className="hidden lg:block w-[2px] h-8 bg-gray-500/50"></div>

                                <button
                                    onClick={() => {
                                        if (editMode) alert("Salvo com sucesso!");
                                        setEditMode(!editMode);
                                    }}
                                    
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] text-white rounded-full h-[42px] shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[130px] xl:w-[160px] text-base xl:text-lg"
                                >
                                    {editMode ? "Salvar" : "Editar"}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full h-[42px] text-white shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[120px] xl:w-[160px] text-base xl:text-lg"
                                >
                                    Login
                                </Link>

                                <div className={`hidden lg:block w-[2px] h-8 ${isOpen ? 'bg-black/20' : 'bg-gray-500/50'}`}></div>

                                <Link 
                                    to="/cadastro" 
                                    className="hidden lg:flex items-center justify-center bg-[#C83D3D] rounded-full h-[42px] text-white shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[120px] xl:w-[160px] text-base xl:text-lg"
                                >
                                    Cadastrar
                                </Link>
                            </>
                        )}

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
