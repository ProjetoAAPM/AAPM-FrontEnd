import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/admin/AuthContext";
import type { ChangeEvent, SyntheticEvent } from "react";
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

    const gridEspecialidades = ["Gestão", "TI", "Elétrica", "Mecânica", "Segurança"];

    const cores = {
        aluno: { bg: "bg-[#C83D3D]", bg_label: "bg-[#902C2D]", btn: "bg-[#383636]", titulo: "text-[#FFFFFF]" },
        docente: { bg: "bg-[#86D5FE]", bg_label: "bg-[#2C6090]", btn: "bg-[#383636]", titulo: "text-[#16334D]" },
        login: { bg: "bg-[#FFEFAF]", bg_label: "bg-[#FFDB4B]", btn: "bg-[#FFDB4B]", titulo: "text-[#101625]" }
    };

    const tema = tipo === "login" ? cores.login : dados.tipo_usuario === "aluno" ? cores.aluno : cores.docente;

    const estiloLabel = `${tema.bg_label} w-fit py-2 px-14 rounded-r-full mb-2 text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${tipo === "login" ? "text-[#373737] font-bold" : "pl-20 -ml-18.5 text-[#FFFFFF] font-semibold"}`;
    const estiloInput = `h-[40px] p-3 bg-white rounded-md ${tipo === "login" ? "w-[380px] mx-15 shadow-md" : "mx-2 shadow-md"}`;

    const enviar = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (tipo === "login") {
            if (dados.email === "admin@gmail.com" || dados.email.includes("admin")) {
                const isAdmin = await loginAdmin(dados.email, dados.senha);
                if (isAdmin) {
                    navigate("/admin");
                    return;
                }
            }

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
                    if (resultado.status_usuario === "INATIVO") {
                        localStorage.setItem("usuario_id", resultado.usuario_id);
                        alert(resultado.mensagem);
                        navigate("/escolhaplano");
                        return;
                    }

                    setUsuario?.({
                        nome: resultado.usuario.usuario_nome,
                        tipo_usuario: resultado.usuario.tipo_usuario,
                        foto: perfil1,
                        premium: resultado.usuario.premium
                    });

                    alert(resultado.mensagem || "Login realizado com sucesso!");
                    navigate("/home");
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 0);
                    return;
                }

                alert(resultado.mensagem || "Email ou senha incorretos!");
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

        if (dados.tipo_usuario === "aluno" && !dados.curso) {
            alert("Informe o seu curso!");
            return;
        }

        if (dados.tipo_usuario === "docente" && !dados.especialidade) {
            alert("Informe sua especialidade!");
            return;
        }

        try {
            const rota = dados.tipo_usuario === "aluno" ? "/cadastro/aluno" : "/cadastro/docente";

            const resposta = await fetch(`http://localhost:5000${rota}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem("usuario_id", resultado.usuario_id);

                if (resultado.status_usuario === "INATIVO") {
                    alert(resultado.mensagem);
                    navigate("/escolhaplano");
                    return;
                }

                alert(resultado.mensagem || "Cadastro realizado com sucesso!");
                navigate("/escolhaplano");
                return;
            }

            alert(resultado.mensagem || "Erro no cadastro");
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div className="w-full flex justify-center py-20">
            <form
                onSubmit={enviar}
                className={`${tema.bg} ${tipo === "login" ? "min-h-[500px] w-[500px] mt-35" : "max-w-[848px] w-full mt-20 mb-20"} py-10 rounded-xl flex flex-col items-center gap-6 relative`}
            >
                <h2 className={`text-4xl font-bold italic mt-4 ${tema.titulo}`}>
                    {tipo === "login" ? "Faça seu Login" : "Faça seu Cadastro"}
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8">
                    {tipo !== "login" && (
                        <div className="flex flex-col w-full">
                            <label className={estiloLabel}>Nome:</label>
                            <input type="text" name="nome" value={dados.nome} onChange={guardar} className={estiloInput} required />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className={estiloLabel}>E-mail:</label>
                        <input type="email" name="email" value={dados.email} onChange={guardar} className={estiloInput} required />
                    </div>

                    <div className="flex flex-col">
                        <label className={estiloLabel}>Senha:</label>
                        <input type="password" name="senha" value={dados.senha} onChange={guardar} className={estiloInput} required />
                    </div>

                    {tipo !== "login" && (
                        <div className="flex flex-col">
                            <label className={estiloLabel}>Confirmar Senha:</label>
                            <input type="password" name="confirmar_senha" value={dados.confirmar_senha} onChange={guardar} className={estiloInput} required />
                        </div>
                    )}

                    <button type="submit" className={`${tema.btn} w-[170px] h-[50px] rounded-2xl text-white font-bold mx-auto cursor-pointer`}>
                        {tipo === "login" ? "Entrar" : "Cadastrar-se"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Formulario;