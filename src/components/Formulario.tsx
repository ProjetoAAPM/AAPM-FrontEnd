import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/admin/AuthContext";
import type { ChangeEvent, SyntheticEvent } from "react";
import { ChevronDown } from "lucide-react";

import perfil1 from "../assets/perfis/user1.png";

interface Props {
    tipo: "login" | "cadastro";
    setUsuario?: (usuario: any) => void;
}

function Formulario({ tipo, setUsuario }: Props) {
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

    const guardar = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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

    const loginGoogle = () => {
        window.location.href = "http://localhost:5000/login/google";
    };

    const cursos = [
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

    const especialidades = [
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

    const estiloLabel = `${tema.bg_label} w-fit py-2 px-8 lg:px-14 rounded-r-full mb-2 text-sm md:text-base lg:text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${
        tipo === "login"
            ? "text-[#373737] font-bold"
            : "lg:pl-20 text-[#FFFFFF] font-semibold"
    }`;

    const estiloInput = `h-[40px] p-3 bg-white rounded-md shadow-md text-sm md:text-base ${
        tipo === "login"
            ? "w-[85%] self-center"
            : "w-full"
    }`;

    const enviar = async (
        e: SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) => {
        e.preventDefault();

        if (tipo === "login") {
            try {
                const resposta = await fetch(
                    "http://localhost:5000/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            email: dados.email,
                            senha: dados.senha
                        })
                    }
                );

                const resultado = await resposta.json();

                if (resposta.ok) {
                    const tipoUsuario =
                        resultado.tipo_usuario ||
                        resultado.usuario?.tipo_usuario;

                    if (tipoUsuario === "administrador") {
                        await loginAdmin(
                            dados.email,
                            dados.senha
                        );

                        alert(
                            resultado.mensagem ||
                            "Login de administrador realizado com sucesso!"
                        );

                        navigate("/admin");
                        return;
                    }

                    if (resultado.status_usuario === "INATIVO") {
                        localStorage.setItem(
                            "usuario_id",
                            resultado.usuario_id
                        );

                        localStorage.setItem(
                            "status_usuario",
                            "INATIVO"
                        );

                        alert(resultado.mensagem);

                        navigate("/escolhaplano");
                        return;
                    }

                    localStorage.setItem(
                        "usuario_id",
                        resultado.usuario_id || resultado.usuario?.id
                    );

                    localStorage.setItem(
                        "status_usuario",
                        resultado.status_usuario || "ATIVO"
                    );

                    setUsuario?.({
                        nome: resultado.usuario?.usuario_nome,
                        tipo_usuario: resultado.usuario?.tipo_usuario,
                        foto: perfil1,
                        premium: resultado.usuario?.premium
                    });

                    alert(
                        resultado.mensagem ||
                        "Login realizado com sucesso!"
                    );

                    navigate("/home");
                    return;
                }

                if (resposta.status === 403) {
                    alert(
                        "Seu acesso está inativo porque o pagamento está pendente ou em análise."
                    );

                    navigate("/escolhaplano");
                    return;
                }

                alert(
                    resultado.mensagem ||
                    "Email ou senha incorretos!"
                );

            } catch (erro) {
                console.error("Erro na requisição:", erro);

                alert("Não foi possível conectar ao servidor.");
            }

            return;
        }

        if (dados.senha !== dados.confirmar_senha) {
            alert("Senhas diferentes!");
            return;
        }

        if (
            dados.tipo_usuario === "aluno" &&
            !dados.curso
        ) {
            alert("Informe o seu curso!");
            return;
        }

        if (
            dados.tipo_usuario === "docente" &&
            !dados.especialidade
        ) {
            alert("Informe sua especialidade!");
            return;
        }

        try {
            const rota =
                dados.tipo_usuario === "aluno"
                    ? "/cadastro/aluno"
                    : "/cadastro/docente";

            const resposta = await fetch(
                `http://localhost:5000${rota}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem(
                    "usuario_id",
                    resultado.usuario_id
                );

                localStorage.setItem(
                    "status_usuario",
                    resultado.status_usuario || "ATIVO"
                );

                alert(
                    resultado.mensagem ||
                    "Cadastro realizado com sucesso!"
                );

                navigate("/escolhaplano");
                return;
            }

            const mensagemErro =
                resultado.erro_validacao ||
                resultado.erro_interno ||
                resultado.erro_usuario ||
                resultado.mensagem ||
                "Falha no cadastro.";

            alert(`Erro: ${mensagemErro}`);

        } catch (erro) {
            console.error("Erro na requisição:", erro);

            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div className="w-full flex justify-center py-20 px-2">
            <form
                onSubmit={enviar}
                className={`${tema.bg} ${
                    tipo === "login"
                        ? "w-[320px] md:w-[450px] lg:w-[500px] mt-10"
                        : "max-w-[330px] md:max-w-[600px] lg:max-w-[848px] w-full mt-10 lg:mt-20"
                } py-10 rounded-xl flex flex-col items-center gap-6 relative`}
            >
                <img
                    src="src/assets/icons/Logo48.svg"
                    alt="logo"
                    className="absolute -top-[50px] h-[100px] w-auto drop-shadow-md"
                />

                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold italic mt-4 ${tema.titulo}`}>
                    {tipo === "login"
                        ? "Faça seu Login"
                        : "Faça seu Cadastro"}
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8 px-3">

                    {tipo !== "login" && (
                        <div className="flex flex-col">
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

                    <div className="flex flex-col">
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
                            <div className="flex flex-col">
                                <label className={estiloLabel}>
                                    Você é?
                                </label>

                                <div className="flex gap-4 flex-wrap">
                                    <button
                                        type="button"
                                        onClick={() => alternarUsuario("aluno")}
                                        className={`w-[130px] h-[45px] rounded-xl text-base font-bold shadow-sm ${
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
                                        className={`w-[130px] h-[45px] rounded-xl text-base font-bold shadow-sm ${
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
                                    <div className="relative flex flex-col">
                                        <label className={estiloLabel}>
                                            Curso:
                                        </label>

                                        <select
                                            name="curso"
                                            value={dados.curso}
                                            onChange={guardar}
                                            className="h-[40px] p-2 bg-white rounded-md shadow-md appearance-none text-sm md:text-base"
                                            required
                                        >
                                            <option value="">
                                                Selecione seu curso
                                            </option>

                                            {cursos.map((curso) => (
                                                <option
                                                    key={curso}
                                                    value={curso}
                                                >
                                                    {curso}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="absolute right-3 bottom-2 pointer-events-none">
                                            <ChevronDown
                                                size={20}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-white font-semibold mb-2">
                                                Data Início
                                            </label>

                                            <input
                                                type="date"
                                                name="inicio_curso"
                                                value={dados.inicio_curso}
                                                onChange={guardar}
                                                className={estiloInput}
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="text-white font-semibold mb-2">
                                                Data Final
                                            </label>

                                            <input
                                                type="date"
                                                name="fim_curso"
                                                value={dados.fim_curso}
                                                onChange={guardar}
                                                className={estiloInput}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="relative flex flex-col">
                                    <label className={estiloLabel}>
                                        Especialidade:
                                    </label>

                                    <select
                                        name="especialidade"
                                        value={dados.especialidade}
                                        onChange={guardar}
                                        className="h-[40px] p-2 bg-white rounded-md shadow-md appearance-none"
                                        required
                                    >
                                        <option value="">
                                            Selecione seu nicho
                                        </option>

                                        {especialidades.map((nicho) => (
                                            <option
                                                key={nicho}
                                                value={nicho}
                                            >
                                                {nicho}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="absolute right-3 bottom-2 pointer-events-none">
                                        <ChevronDown
                                            size={20}
                                            className="text-gray-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col">
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
                        <div className="w-full flex justify-start">
                            <a
                                href="https://pess.sesisenaispedu.org.br/Portal.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#101625] text-sm font-semibold underline"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>
                    )}

                    {tipo !== "login" && (
                        <div className="flex flex-col">
                            <label className={estiloLabel}>
                                Confirmar Senha:
                            </label>

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

                    <div className="flex justify-center gap-6 flex-wrap mt-4">
                        <button
                            type="submit"
                            className={`${tema.btn} ${
                                tipo === "login"
                                    ? "rounded-full text-[#373737]"
                                    : "rounded-2xl text-white"
                            } w-[170px] h-[50px] text-lg font-bold shadow-md`}
                        >
                            {tipo === "login"
                                ? "Entrar"
                                : "Cadastrar-se"}
                        </button>

                        {tipo === "login" && (
                            <button
                                type="button"
                                onClick={loginGoogle}
                                className="w-[170px] h-[50px] bg-white border border-gray-300 rounded-full flex items-center justify-center gap-3 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 transition-all"
                            >
                                <img
                                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                                    alt="Google"
                                    className="w-6 h-6"
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