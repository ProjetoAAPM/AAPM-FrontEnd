import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    tipo_usuario: "aluno",
  });

  const navigate = useNavigate();

  const guardar = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const alternarUsuario = (selecao: "aluno" | "docente") => {
    setDados({ ...dados, tipo_usuario: selecao });
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
    "CAI Ferramenteiro de Moldes para Plásticos",
  ];

  const especialidades = ["Gestão", "TI", "Elétrica", "Mecânica", "Segurança"];

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

    let rota = "/login";
    if (tipo === "cadastro") {
      rota =
        dados.tipo_usuario === "aluno"
          ? "/cadastro/aluno"
          : "/cadastro/docente";
    }

    try {
      const resposta = await fetch(`http://localhost:5000${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          tipo === "login" ? { email: dados.email, senha: dados.senha } : dados
        ),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        if (resultado.status_usuario === "INATIVO") {
          localStorage.setItem("usuario_id", resultado.usuario_id);
          localStorage.setItem("status_usuario", "INATIVO");
          alert(resultado.mensagem);
          navigate("/escolhaplano"); 
          return;
        }

        localStorage.setItem("usuario_id", resultado.usuario_id || resultado.usuario?.id);
        localStorage.setItem("status_usuario", "ATIVO");

        if (tipo === "login") {
          setUsuario({
            nome: resultado.usuario.usuario_nome,
            tipo_usuario: resultado.usuario.tipo_usuario,
            foto: perfil1,
            premium: resultado.usuario.premium,
          });
        }

        if (tipo === "cadastro") {
          localStorage.setItem("usuario_id", resultado.usuario_id);
        }

        alert(resultado.mensagem || "Operação realizada com sucesso!");

        navigate(tipo === "cadastro" ? "/escolhaplano" : "/home");

        setTimeout(() => {
          window.location.reload();
        }, 0);

      } else {
        if (resposta.status === 403) {
          alert(
            "Seu acesso está inativo porque o pagamento está pendente ou em analíse. Redirecionando para regularização..."
          );
          navigate("/escolhaplano");
          return;
        }

        const mensagemErro =
          resultado.erro_validacao ||
          resultado.erro_interno ||
          resultado.erro_usuario ||
          resultado.mensagem ||
          "Falha na operação.";
        alert(`Erro: ${mensagemErro}`);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert(
        "Não foi possível conectar ao servidor. Certifique-se de que o Flask-CORS está ativo no seu app.py."
      );
    }
  };

  const loginGoogle = () => {
    window.location.href = "http://localhost:5000/login/google";
  };

  const cores = {
    aluno: {
      bg: "bg-[#C83D3D]",
      bg_label: "bg-[#902C2D]",
      btn: "bg-[#383636]",
      titulo: "text-[#FFFFFF]",
    },
    docente: {
      bg: "bg-[#86D5FE]",
      bg_label: "bg-[#2C6090]",
      btn: "bg-[#383636]",
      titulo: "text-[#16334D]",
    },
    login: {
      bg: "bg-[#FFEFAF]",
      bg_label: "bg-[#FFDB4B]",
      btn: "bg-[#FFDB4B]",
      titulo: "text-[#101625]",
    },
  };

  const tema =
    tipo === "login"
      ? cores.login
      : dados.tipo_usuario === "aluno"
        ? cores.aluno
        : cores.docente;

  const estiloLabel = `${tema.bg_label
    } w-fit py-1.5 px-8 lg:py-2 lg:px-14 rounded-r-full mb-2 text-sm md:text-base lg:text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${tipo === "login"
      ? " text-[#373737] font-bold"
      : "lg:pl-20 ml-0.1 md:pl-10 lg:-ml-18.5 text-[#FFFFFF] font-semibold"
    }`;

  const estiloInput = `h-[35px] lg:h-[40px] p-3 bg-white rounded-md ${tipo === "login" ? "text-sm md:text-base w-[85%] lg:w-[85%] mx-15 shadow-md" : "text-sm md:text-base mx-2 md:mx-10 lg:mx-0 shadow-md"
    }`;

  return (
    <div className="w-full flex justify-center py-20">
      <form
        onSubmit={enviar}
        className={`${tema.bg} ${tipo === "login"
          ? "w-[320px] md:w-[450px] lg:w-[500px] mt-3 md:mt-5 lg:mt-12"
          : "max-w-[330px] md:max-w-[600px] lg:max-w-[848px] w-full mt-10 lg:mt-20"
          } py-10 rounded-xl flex flex-col items-center gap-6 relative`}
      >
        <img
          src="src/assets/icons/Logo48.svg"
          alt="logo"
          className={`${tipo === "login" ? "-top-[40px] md:-top-[45px] lg:-top-[50px]" : "-top-[40px] md:-top-[45px] lg:-top-[50px]"
            } absolute h-[80px] md:h-[90px] lg:h-[100px] w-auto drop-shadow-md`}
        />
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold italic mt-4 ${tema.titulo}`}>
          {tipo === "login" ? "Faça seu Login" : "Faça seu Cadastro"}
        </h2>

        <div className="w-full max-w-[700px] flex flex-col gap-8">
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

          <div className="flex flex-col">
            <label className={estiloLabel}>E-mail:</label>
            <input
              type="email"
              name="email"
              value={dados.email}
              onChange={guardar}
              className={`${estiloInput} ml-5.5 md:ml-8.5`}
              required
            />
          </div>

          {tipo !== "login" && (
            <>
              <div className="flex flex-col">
                <label className={estiloLabel}>Você é?</label>
                <div className="grid grid-cols-3 ml-2 gap-2 md:grid-cols-5 md:ml-10.5 lg:grid-cols-5 lg:gap-6 lg:ml-0">
                  <button
                    type="button"
                    onClick={() => alternarUsuario("aluno")}
                    className={`
                        w-[100px] h-[40px] lg:w-[130px] lg:h-[45px] rounded-xl text-sm lg:text-lg font-bold shadow-sm cursor-pointer
                        ${dados.tipo_usuario === "aluno"
                        ? "bg-[#383636] text-white"
                        : "bg-[#DDDDDD] text-black"
                      }`}
                  >
                    Aluno
                  </button>

                  <button
                    type="button"
                    onClick={() => alternarUsuario("docente")}
                    className={`
                        w-[100px] h-[40px] lg:w-[130px] lg:h-[45px] rounded-xl text-sm lg:text-lg font-bold shadow-sm cursor-pointer 
                        ${dados.tipo_usuario === "docente"
                        ? "bg-[#383636] text-white "
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
                    <label className={estiloLabel}>Curso:</label>
                    <select
                      name="curso"
                      value={dados.curso}
                      onChange={guardar}
                      className="h-[35px] lg:h-[40px] p-1 lg:p-2 m-2 lg:m-1.5 md:mx-10 lg:mx-0 bg-white rounded-md shadow-md appearance-none text-sm lg:text-base"
                      required
                    >
                      <option value="">Selecione seu curso</option>
                      {cursos.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <div className="absolute right-4 md:right-12 md:top-17.5 lg:right-3 top-16.5 lg:top-20 -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={20} className="text-gray-500" />
                    </div>
                  </div>

                  <div className=" flex flex-col">
                    <label className={estiloLabel}>Duração do Curso:</label>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
                      <div className="flex flex-col">
                        <label className="text-white text-base lg:text-lg text-center font-semibold mb-2">
                          Data Inicio
                        </label>
                        <input
                          type="date"
                          name="inicio_curso"
                          value={dados.inicio_curso}
                          onChange={guardar}
                          onClick={(e) =>
                            (e.target as HTMLInputElement).showPicker()
                          }
                          onFocus={(e) => (e.target.style.color = "black")}
                          onBlur={(e) =>
                          (e.target.style.color = e.target.value
                            ? "black"
                            : "transparent")
                          }
                          style={{
                            color: dados.inicio_curso ? "black" : "transparent",
                          }}
                          className={`${estiloInput} pl-3 pr-3 md:ml-10 md:pl-2 md:mr-8 md:pr-1 lg:pl-4 lg:pr-4  cursor-pointer`}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-white text-base lg:text-lg text-center font-semibold mb-2">
                          Data Final
                        </label>
                        <input
                          type="date"
                          name="fim_curso"
                          value={dados.fim_curso}
                          onChange={guardar}
                          onFocus={(e) => (e.target.style.color = "black")}
                          onBlur={(e) =>
                          (e.target.style.color = e.target.value
                            ? "black"
                            : "transparent")
                          }
                          style={{
                            color: dados.fim_curso ? "black" : "transparent",
                          }}
                          className={`${estiloInput} pl-3 pr-3 md:ml-10 md:pl-2 md:mr-8 md:pr-1 lg:pl-4 lg:pr-4 cursor-pointer`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative flex flex-col">
                  <label className={estiloLabel}>Especialidade:</label>
                  <select
                    name="especialidade"
                    value={dados.especialidade}
                    onChange={guardar}
                    className="h-[40px] p-2 m-1.5 md:mx-10 bg-white rounded-md shadow-md appearance-none text-sm lg:text-base"
                    required
                  >
                    <option value="">Selecione seu nicho</option>
                    {especialidades.map((nicho) => (
                      <option key={nicho} value={nicho}>
                        {nicho}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-3 top-20 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className="text-gray-500" />
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
              className={`${estiloInput} ml-5.5 md:ml-8.5`}
              required
            />
          </div>

          {tipo === "login" && (
            <div className="w-full flex justify-start pl-6 -mt-3 md:pl-8.5 md:-mt-2 lg:pl-9 lg:-mt-3">
              <a
                href="https://pess.sesisenaispedu.org.br/Portal.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#101625] text-xs md:text-sm lg:text-base font-semibold underline underline-offset-4 cursor-pointer"
              >
                Esqueceu a senha?
              </a>
            </div>
          )}

          {tipo !== "login" && (
            <div className="flex flex-col">
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

          <div className="flex justify-center mt-4 gap-6">
            <button
              type="submit"
              className={`${tema.btn} ${tipo === "login"
                ? "w-[120px] h-[40px] md:w-[150px] lg:w-[170px] lg:h-[50px] rounded-full text-[#373737]"
                : "w-[140px] h-[45px] lg:w-[170px] lg:h-[50px] rounded-2xl text-[#FFFFFF]"
                } text-base md:text-lg lg:text-xl font-bold shadow-md cursor-pointer`}
            >
              {tipo === "login" ? "Entrar" : "Cadastrar-se"}
            </button>

            {tipo === "login" && (
              <>
                <button
                  type="button"
                  onClick={loginGoogle}
                  className="w-[120px] h-[40px] md:w-[150px] lg:w-[170px] lg:h-[50px] bg-white border border-gray-300 rounded-full flex items-center justify-center gap-3 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <img
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    alt="Google"
                    className="w-6 h-6"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
