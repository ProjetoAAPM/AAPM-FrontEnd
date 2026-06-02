import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import MenuMobile from "./MenuMobile";
import ModalPerfil from "./ModalPerfil";
import type { Usuario } from "../types/Usuario";
import { useEditMode } from "../contexts/modo_editar";
import logoImg from "/src/assets/icons/Logo48.svg";
import { limparTodoConteudo } from "../Services/conteudoService";
import LayoutAviso from "../alerts/LayoutAviso";

interface HeaderProps {
    usuario: Usuario;
    setUsuario: Dispatch<SetStateAction<Usuario>>;
}

function Header({ usuario, setUsuario }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [perfilOpen, setPerfilOpen] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const { editMode, setEditMode } = useEditMode();

    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = location.pathname.startsWith("/admin");

    function logout() {
        localStorage.clear();

        setUsuario({
            nome: "",
            foto: "",
            tipo_usuario: "aluno",
            curso: "",
            dataInicio: "",
            dataFinal: "",
            premium: false
        });

        setIsOpen(false);

        navigate("/");
    }

    function verificarAcesso(e: React.MouseEvent<HTMLAnchorElement>) {
        if (isAdmin) {
            return;
        }

        if (!usuario?.nome){
            e.preventDefault();
            setModalAberto(true);
        }
    }

    async function resetarPadrao() {
        const confirmar = window.confirm(
            "Deseja voltar ao conteúdo padrão original?"
        );

        if (!confirmar) return;

        await limparTodoConteudo();

        const chaves = [
            "inicio-texto",
            "sobre-texto",
            "img-futsal",
            "img-grupo",
            "jornal-img1",
            "jornal-img2",
            "jornal-img3",
            "jornal-img4",
            "jornal-texto-col1",
            "jornal-texto-col2",
            "jornal-texto-col3-1",
            "jornal-texto-col3-2",
            "carrossel-slides"
        ];

        chaves.forEach((chave) => {
            localStorage.removeItem(chave);
        });

        setEditMode(false);

        window.location.reload();
    }

    const navLink =
        "hover:text-[#FFD44B] transition-all duration-200";

    const botaoAdmin =
        "bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-semibold rounded-full px-8 py-2 text-base min-w-[130px] text-center cursor-pointer";

    return (
        <>

        <LayoutAviso 
            aberto={modalAberto} 
            fechar={() => setModalAberto(false)} 
            titulo="ATENÇÃO!"
            textoBotao="Fechar" 
            largura="max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl" 
            corFundo="#BE2920" 
            corTitulo="#B42C24" 
            corBotao="#B42C24"
            className="font-semibold"
        >
            <p className="text-lg md:text-xl lg:text-2xl">
                O acesso às abas do site é <span className="text-[#C83D3D] font-bold">restrito</span> a usuários autenticados.
            </p>

            <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                Caso ainda não possua cadastro, convidamos você a se registrar e se tornar mebro da AAPM.
            </p>
        </LayoutAviso>

            <div
                className={`absolute w-full flex justify-center z-50 transition-all duration-300 ${
                    isOpen
                        ? "px-0"
                        : "min-[1330px]:mt-4 min-[1330px]:px-10"
                }`}
            >
                <div
                    className={`w-full max-w-[1812px] h-[75px] flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
                        isOpen
                        ? "fixed bg-[#FFD44B]"
                        : "bg-[#211F1D]/80 backdrop-blur-lg min-[1330px]:rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                    }`}
                    >

                    <Link to="/" className="flex items-center gap-2 md:gap-3">
                        <img
                            src={logoImg}
                            alt="Logo"
                            className="h-[40px] md:h-[45px] w-auto object-contain"
                        />

                        <p
                            className={`text-sm md:text-xl font-semibold whitespace-nowrap transition-colors ${
                                isOpen
                                    ? "text-black"
                                    : "text-white"
                            }`}
                        >
                            AAPM Senai Leopoldina
                        </p>
                    </Link>

                    <div className="hidden min-[1330px]:flex gap-6 xl:gap-16 2xl:gap-28 text-white text-sm xl:text-base 2xl:text-lg font-medium">
                        <Link
                            className={navLink}
                            to={isAdmin ? "/admin" : "/home"}
                            onClick={verificarAcesso}
                        >
                            Home
                        </Link>

                        {isAdmin && (
                            <Link
                                className={navLink}
                                to="/admin/usuario"
                            >
                                Usuário
                            </Link>
                        )}

                        <Link
                            className={navLink}
                            to={
                                isAdmin
                                    ? "/admin/novidades"
                                    : "/novidades"
                            }
                            onClick={verificarAcesso}
                        >
                            Novidades
                        </Link>

                        <Link
                            className={navLink}
                            to={
                                isAdmin
                                    ? "/admin/pagamento"
                                    : "/pagamento"
                            }
                            onClick={verificarAcesso}
                        >
                            Pagamento
                        </Link>
                    </div>

                    <div className="flex gap-2 md:gap-4 xl:gap-6 items-center">

                        {isAdmin ? (
                            <div className="hidden min-[1330px]:flex items-center gap-4">

                                <button
                                    onClick={resetarPadrao}
                                    className={botaoAdmin}
                                >
                                    Padrão
                                </button>

                                <div className="w-[2px] h-8 bg-gray-500/50" />

                                <button
                                    onClick={() => {
                                        if (editMode) {
                                            alert("Salvo com sucesso!");
                                        }

                                        setEditMode(!editMode);
                                    }}
                                    className={botaoAdmin}
                                >
                                    {editMode ? "Salvar" : "Editar"}
                                </button>

                            </div>
                        ) : (
                            <>
                                {usuario?.nome ? (
                                    <div
                                        onClick={() => setPerfilOpen(true)}
                                        className="hidden min-[1330px]:flex items-center gap-3 cursor-pointer"
                                    >
                                        <img
                                            src={usuario.foto}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />

                                        <p
                                            className={`px-4 py-1.5 rounded-full font-bold ${
                                                usuario.premium
                                                    ? "bg-gradient-to-r from-[#FFD700] to-[#C9A227] text-black"
                                                    : "bg-gray-300 text-black"
                                            }`}
                                        >
                                            {usuario.nome}
                                        </p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                logout();
                                            }}
                                            className="text-white text-sm opacity-70 hover:opacity-100 transition-all cursor-pointer"
                                        >
                                            sair
                                        </button>
                                    </div>
                                ) : (
                                    <div className="hidden min-[1330px]:flex items-center">

                                        <Link
                                            to="/login"
                                            className={botaoAdmin}
                                        >
                                            Login
                                        </Link>

                                        <div className="mx-4 text-white/70 text-xl font-light">
                                            |
                                        </div>

                                        <Link
                                            to="/cadastro"
                                            className={botaoAdmin}
                                        >
                                            Cadastrar
                                        </Link>

                                    </div>
                                )}
                            </>
                        )}

                        {/* MOBILE */}
                        <div className="flex items-center gap-3 min-[1330px]:hidden">

                            {!isAdmin && usuario?.nome && (
                                <button
                                    onClick={() => setPerfilOpen(true)}
                                >
                                    <img
                                        src={usuario.foto}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </button>
                            )}

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 cursor-pointer"
                                aria-label="Menu"
                            >
                                <span
                                    className={`h-0.5 w-6 transition-all duration-300 ${
                                        isOpen
                                            ? "rotate-45 translate-y-2 bg-black"
                                            : "bg-white"
                                    }`}
                                />

                                <span
                                    className={`h-0.5 w-6 transition-all duration-300 ${
                                        isOpen
                                            ? "opacity-0"
                                            : "bg-white"
                                    }`}
                                />

                                <span
                                    className={`h-0.5 w-6 transition-all duration-300 ${
                                        isOpen
                                            ? "-rotate-45 -translate-y-2 bg-black"
                                            : "bg-white"
                                    }`}
                                />

                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MenuMobile
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                usuario={usuario}
                logout={logout}
            />

            <ModalPerfil
                perfilOpen={perfilOpen}
                setPerfilOpen={setPerfilOpen}
                usuario={usuario}
                setUsuario={setUsuario}
            />
        </>
    );
}

export default Header;