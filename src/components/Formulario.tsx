import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/admin/AuthContext";
import type { ChangeEvent, SyntheticEvent } from "react";
import { ChevronDown } from "lucide-react";
import perfil1 from "../assets/perfis/user1.png";

function Formulario({ tipo, setUsuario }: any) {
    const [dados, setDados] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmar_senha: "",
        curso: "",
        especialidade: "",
        inicio_curso: "",
        fim_curso: "",
        tipo_usuario: "aluno"
    });

    const navigate = useNavigate();
    const { login: loginAdmin } = useAuth();

    const loginGoogle = () => {
        console.log("Login com Google");
    };

    const guardar = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value
        });
    };

    const alternarUsuario = (selecao: "aluno" | "docente") => {
        setDados({
            ...dados,
            tipo_usuario: selecao
        });
    };

    const courses = [
        "Tec Administração",
        "Tec Desenvolvimento de Sistemas",
        "Tec Eletroeletrônica",
        "Tec Manutenção de Sistemas Metroferroviários",
        "Tec Mecânica",
        "Tec Mecatrônica",
        "Tec Segurança do Trabalho",
        "CAI Mecânico de Usinagem",
        "CAI Eletricista de Manutenção Eletroeletrônica",
        "CAI Ferramenteiro de Moldes para Plásticos"
    ];

    const poolEspecialidades = [
        "Gestão",
        "TI",
        "Elétrica",
        "Mecânica",
        "Segurança"
    ];

    const cores = {
        aluno: {
            bg: "bg-[#C83D3D]",
            bg_label: "bg-[#902C2D]",
            btn: "bg-[#383636]",
            titulo: "text-[#FFFFFF]"
        },
        docente: {
            bg: "bg-[#86D5FE]",
            bg_label: "bg-[#2C6090]",
            btn: "bg-[#383636]",
            titulo: "text-[#16334D]"
        },
        login: {
            bg: "bg-[#FFEFAF]",
            bg_label: "bg-[#FFDB4B]",
            btn: "bg-[#FFDB4B]",
            titulo: "text-[#101625]"
        }
    };

    const tema =
        tipo === "login"
            ? cores.login
            : dados.tipo_usuario === "aluno"
                ? cores.aluno
                : cores.docente;

    const estiloLabel = `${tema.bg_label} w-fit py-2 px-10 sm:px-14 rounded-r-full mb-2 text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${
        tipo === "login"
            ? "text-[#373737] font-bold"
            : "pl-6 sm:pl-20 sm:-ml-18.5 text-[#FFFFFF] font-semibold"
    }`;

    const estiloInput = `h-[40px] p-3 bg-white rounded-md mx-2 shadow-md ${
        tipo === "login"
            ? "w-[92%] sm:w-[380px] self-center"
            : "w-[calc(100%-1rem)]"
    }`;

    const enviar = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (tipo === "cadastro") {
            if (dados.senha !== dados.confirmar_senha) {
                alert("Senhas diferentes!");
                return;
            }

            if (dados.tipo_usuario === "aluno" && !dados.curso) {
                alert("Informe o seu curso!");
                return;
            }

            if (dados.tipo_usuario === "docente" && !dados.especialidade) {
                alert("Informe sua especialidade!");
                return;
            }
        }

        if (tipo === "login") {
            try {
                const resposta = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        email: dados.email,
                        senha: dados.senha
                    })
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    const tipoUsuario =
                        resultado.tipo_usuario ||
                        resultado.usuario?.tipo_usuario;

                    if (tipoUsuario === "administrador") {
                        console.log("Login de ADMINISTRADOR confirmado pelo backend");

                        await loginAdmin(dados.email, dados.senha);

                        alert(
                            resultado.mensagem ||
                            "Login de Administrador realizado com sucesso!"
                        );

                        navigate("/admin");
                        return;
                    }

                    if (resultado.status_usuario === "INATIVO") {
                        localStorage.setItem("usuario_id", resultado.usuario_id);

                        alert(resultado.mensagem);

                        navigate("/escolhaplano");
                        return;
                    }

                    setUsuario?.({
                        nome: resultado.usuario?.usuario_nome,
                        tipo_usuario: resultado.usuario?.tipo_usuario,
                        foto: perfil1,
                        premium: resultado.usuario?.premium
                    });

                    alert(resultado.mensagem || "Login realizado com sucesso!");

                    navigate("/home");

                    setTimeout(() => {
                        window.location.reload();
                    }, 100);

                    return;
                }

                if (resposta.status === 403) {
                    alert(
                        "Seu acesso está inativo. Redirecionando para regularização..."
                    );

                    navigate("/escolhaplano");
                    return;
                }

                alert(resultado.mensagem || "Email ou senha incorretos!");

            } catch (erro) {
                console.error("Erro na requisição:", erro);

                alert("Não foi possível conectar ao servidor.");
            }

            return;
        }

        try {
            const rota =
                dados.tipo_usuario === "aluno"
                    ? "/cadastro/aluno"
                    : "/cadastro/docente";

            const resposta = await fetch(`http://localhost:5000${rota}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem("usuario_id", resultado.usuario_id);

                alert(resultado.mensagem || "Cadastro realizado com sucesso!");

                navigate("/escolhaplano");

                setTimeout(() => {
                    window.location.reload();
                }, 100);

            } else {
                const mensagemErro =
                    resultado.erro_validacao ||
                    resultado.erro_interno ||
                    resultado.erro_usuario ||
                    resultado.mensagem ||
                    "Falha no cadastro.";

                alert(`Erro: ${mensagemErro}`);
            }

        } catch (erro) {
            console.error("Erro na requisição:", erro);

            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div className="w-full flex justify-center py-20 px-2 sm:px-4">
            <form
                onSubmit={enviar}
                className={`${tema.bg} ${
                    tipo === "login"
                        ? "min-h-[500px] w-full max-w-[500px] mt-35"
                        : "max-w-[848px] w-full mt-20 mb-20"
                } py-10 rounded-xl flex flex-col items-center gap-6 relative`}
            >
                <img
                    src="src/assets/icons/Logo48.svg"
                    alt="logo"
                    className="absolute -top-[50px] h-[100px] w-auto drop-shadow-md"
                />

                <h2 className="text-3xl sm:text-4xl font-bold italic mt-4 text-center px-4">
                    <span className={tema.titulo}>
                        {tipo === "login" ? "Faça seu Login" : "Faça seu Cadastro"}
                    </span>
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8 px-3 sm:px-0">
                    {tipo !== "login" && (
                        <div className="flex flex-col w-full">
                            <label className={estiloLabel}>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={dados.nome}
                                onChange={guardar}
                                className={estiloInput}
                                required
                            />
                        </div>
                    )}

                    <div className="flex flex-col w-full">
                        <label className={estiloLabel}>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={dados.email}
                            onChange={guardar}
                            className={estiloInput}
                            required
                        />
                    </div>

                    {tipo !== "login" && (
                        <>
                            <div className="flex flex-col w-full">
                                <label className={estiloLabel}>Você é?</label>
                                <div className="flex gap-4 sm:gap-6 px-2">
                                    <button
                                        type="button"
                                        onClick={() => alternarUsuario("aluno")}
                                        className={`flex-1 sm:flex-initial w-full sm:w-[130px] h-[45px] rounded-xl text-base sm:text-lg font-bold shadow-sm cursor-pointer ${
                                            dados.tipo_usuario === "aluno"
                                                ? "bg-[#383636] text-white"
                                                : "bg-[#DDDDDD] text-black"
                                        }`}
                                    >
                                        Aluno
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => alternarUsuario("docente")}
                                        className={`flex-1 sm:flex-initial w-full sm:w-[130px] h-[45px] rounded-xl text-base sm:text-lg font-bold shadow-sm cursor-pointer ${
                                            dados.tipo_usuario === "docente"
                                                ? "bg-[#383636] text-white"
                                                : "bg-[#DDDDDD] text-black"
                                        }`}
                                    >
                                        Docente
                                    </button>
                                </div>
                            </div>

                            {dados.tipo_usuario === "aluno" ? (
                                <>
                                    <div className="relative flex flex-col w-full">
                                        <label className={estiloLabel}>Curso:</label>
                                        <select
                                            name="curso"
                                            value={dados.curso}
                                            onChange={guardar}
                                            className="h-[40px] p-2 mx-2 bg-white rounded-md shadow-md appearance-none w-[calc(100%-1rem)] text-sm sm:text-base"
                                            required
                                        >
                                            <option value="">Selecione seu curso</option>
                                            {courses.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 bottom-2.5 pointer-events-none">
                                            <ChevronDown size={20} className="text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <label className={estiloLabel}>Duração do Curso:</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                                            <div className="flex flex-col">
                                                <label className="text-white text-base sm:text-lg text-center font-semibold mb-2">
                                                    Data Início
                                                </label>
                                                <input
                                                    type="date"
                                                    name="inicio_curso"
                                                    value={dados.inicio_curso}
                                                    onChange={guardar}
                                                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                                                    onFocus={(e) => (e.target.style.color = "black")}
                                                    onBlur={(e) => (e.target.style.color = e.target.value ? "black" : "transparent")}
                                                    style={{ color: dados.inicio_curso ? "black" : "transparent" }}
                                                    className="h-[40px] p-3 bg-white rounded-md shadow-md pl-3 pr-3 cursor-pointer w-full"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-white text-base sm:text-lg text-center font-semibold mb-2">
                                                    Data Final
                                                </label>
                                                <input
                                                    type="date"
                                                    name="fim_curso"
                                                    value={dados.fim_curso}
                                                    onChange={guardar}
                                                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                                                    onFocus={(e) => (e.target.style.color = "black")}
                                                    onBlur={(e) => (e.target.style.color = e.target.value ? "black" : "transparent")}
                                                    style={{ color: dados.fim_curso ? "black" : "transparent" }}
                                                    className="h-[40px] p-3 bg-white rounded-md shadow-md pl-3 pr-3 cursor-pointer w-full"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="relative flex flex-col w-full">
                                    <label className={estiloLabel}>Especialidade:</label>
                                    <select
                                        name="especialidade"
                                        value={dados.especialidade}
                                        onChange={guardar}
                                        className="h-[40px] p-2 mx-2 bg-white rounded-md shadow-md appearance-none w-[calc(100%-1rem)]"
                                        required
                                    >
                                        <option value="">Selecione seu nicho</option>
                                        {poolEspecialidades.map((nicho) => (
                                            <option key={nicho} value={nicho}>
                                                {nicho}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 bottom-2.5 pointer-events-none">
                                        <ChevronDown size={20} className="text-gray-500" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col w-full">
                        <label className={estiloLabel}>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={dados.senha}
                            onChange={guardar}
                            className={estiloInput}
                            required
                        />
                    </div>

                    {tipo === "login" && (
                        <div className="w-full flex justify-start w-[92%] sm:w-[380px] self-center px-2 -mt-3">
                            <a
                                href="https://pess.sesisenaispedu.org.br/Portal.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#101625] text-sm font-semibold underline underline-offset-4 cursor-pointer"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>
                    )}

                    {tipo !== "login" && (
                        <div className="flex flex-col w-full">
                            <label className={estiloLabel}>Confirmar Senha:</label>
                            <input
                                type="password"
                                name="confirmar_senha"
                                value={dados.confirmar_senha}
                                onChange={guardar}
                                className={estiloInput}
                                required
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 px-2">
                        <button
                            type="submit"
                            className={`${tema.btn} ${
                                tipo === "login"
                                    ? "w-[140px] sm:w-[170px] h-[50px] rounded-full text-[#373737]"
                                    : "w-[140px] sm:w-[170px] h-[50px] rounded-2xl text-[#FFFFFF]"
                            } text-lg sm:text-xl font-bold shadow-md cursor-pointer`}
                        >
                            {tipo === "login" ? "Entrar" : "Cadastrar-se"}
                        </button>

                        {tipo === "login" && (
                            <button
                                type="button"
                                onClick={loginGoogle}
                                className="w-[140px] sm:w-[170px] h-[50px] bg-white border border-gray-300 rounded-full flex items-center justify-center gap-3 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 cursor-pointer transition-all"
                            >
                                <img
                                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                                    alt="Google"
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Formulario;