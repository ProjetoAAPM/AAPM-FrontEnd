import perfil1 from "../assets/perfis/user1.png";
import perfil2 from "../assets/perfis/user2.png";
import perfil3 from "../assets/perfis/user3.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalPerfil({
    perfilOpen,
    setPerfilOpen,
    usuario,
    setUsuario,
    cursos = []
}) {

    const navigate = useNavigate();

    const fotosPerfil = [
        perfil1,
        perfil2,
        perfil3
    ];

    const [editando, setEditando] = useState(false);

    const [dados, setDados] = useState({
        nome: usuario?.nome || "",
        curso: usuario?.curso || "",
        especialidade: usuario?.especialidade || "",
        tipo_usuario: usuario?.tipo_usuario || "aluno",
        foto: usuario?.foto || perfil1,
        dataInicio: usuario?.dataInicio || "",
        dataFinal: usuario?.dataFinal || "",
    });

    function alterarValor(campo, valor) {
        setDados((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    }

    function salvarEdicao() {
        setEditando(false);
    }

    function sairConta() {
        setUsuario(null);
        setPerfilOpen(false);
        localStorage.removeItem("usuario");
        sessionStorage.removeItem("usuario");
        navigate("/");
    }

    if (!usuario) return null;
    if (!perfilOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-start justify-end">

            <div
                className={`
                    w-full
                    max-w-full
                    sm:max-w-[420px]
                    md:max-w-[480px]

                    h-screen
                    sm:h-auto

                    ${
                        dados.tipo_usuario === "docente"
                            ? editando
                                ? "sm:min-h-[620px]"
                                : "sm:min-h-[520px]"
                            : editando
                                ? "sm:min-h-[820px]"
                                : "sm:min-h-[750px]"
                    }

                    rounded-none
                    sm:rounded-l-[5px]

                    bg-gradient-to-r
                    from-[#1D2235]
                    via-[#4B4D57]
                    to-[#1F2A33]

                    shadow-2xl
                    relative
                    overflow-y-auto
                    transition-all
                    duration-300
                `}
            >

                <button
                    onClick={() => setPerfilOpen(false)}
                    className="absolute top-2 right-4 text-white text-3xl sm:text-4xl"
                >
                    ×
                </button>

                <button
                    onClick={sairConta}
                    className="
                        absolute
                        top-3
                        left-3
                        sm:left-4
                        bg-[#C83D3D]
                        hover:bg-[#a93232]
                        transition-all
                        text-white
                        font-bold
                        text-sm
                        sm:text-base
                        px-4
                        py-2
                        rounded-xl
                        shadow-lg
                        cursor-pointer
                    "
                >
                    Sair
                </button>

                <div className="flex flex-col items-center pt-16 sm:pt-12">

                    <div className="relative">

                        <div className="p-[5px] sm:p-[6px] rounded-full bg-gradient-to-br from-[#666666] via-[#FFFAFA] to-[#666666]">
                            <img
                                src={dados.foto}
                                alt=""
                                className="w-22 h-22 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover"
                            />
                        </div>

                    </div>

                    {editando && (
                        <div className="flex gap-2 sm:gap-3 justify-center mt-5 flex-wrap px-3">

                            {fotosPerfil.map((foto, index) => (
                                <img
                                    key={index}
                                    src={foto}
                                    alt=""
                                    onClick={() => alterarValor("foto", foto)}
                                    className={`
                                        w-8 h-8
                                        sm:w-10 sm:h-10
                                        rounded-full
                                        object-cover
                                        cursor-pointer
                                        border-4
                                        transition
                                        hover:scale-105
                                        ${dados.foto === foto ? "border-white" : "border-transparent"}
                                    `}
                                />
                            ))}

                        </div>
                    )}

                    <div className="mt-3 bg-[#4D4D4D] w-full max-w-[280px] min-h-[40px] flex items-center justify-center shadow-md px-3 rounded-md">

                        {editando ? (
                            <input
                                type="text"
                                value={dados.nome}
                                onChange={(e) => alterarValor("nome", e.target.value)}
                                className="w-full h-full bg-transparent text-white text-base sm:text-xl md:text-2xl font-semibold text-center outline-none"
                            />
                        ) : (
                            <p className="text-white text-base sm:text-xl md:text-2xl font-semibold text-center break-words">
                                {dados.nome}
                            </p>
                        )}

                    </div>
                </div>

                <div className="px-3 sm:px-6 md:px-10 mt-8 sm:mt-10 flex flex-col gap-8 sm:gap-10 pb-10">

                    {dados.tipo_usuario === "aluno" ? (
                        <>
                            <div>

                                <div className="bg-[#4D4D4D] w-fit px-4 h-[32px] flex items-center justify-center shadow">
                                    <p className="text-white font-semibold text-base sm:text-xl md:text-2xl">
                                        Curso:
                                    </p>
                                </div>

                                <div className="mt-5 bg-white rounded-xl min-h-[50px] flex items-center justify-center shadow-inner px-2">

                                    {editando ? (
                                        <select
                                            value={dados.curso}
                                            onChange={(e) => alterarValor("curso", e.target.value)}
                                            className="w-full min-h-[50px] rounded-xl text-[#3A3A3A] text-sm sm:text-lg md:text-xl font-bold text-center outline-none bg-white"
                                        >
                                            <option value="">Selecione</option>
                                            {cursos.map((curso, index) => (
                                                <option key={index} value={curso}>
                                                    {curso}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-[#3A3A3A] text-sm sm:text-lg md:text-xl font-bold text-center break-words">
                                            {dados.curso}
                                        </p>
                                    )}

                                </div>
                            </div>

                            <div>

                                <div className="bg-[#4D4D4D] w-fit px-4 h-[32px] flex items-center justify-center shadow">
                                    <p className="text-white font-semibold text-base sm:text-xl md:text-2xl">
                                        Duração:
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 sm:justify-between mt-8">

                                    <div className="flex flex-col items-center gap-4 w-full">

                                        <div className="bg-[#4D4D4D] px-4 py-1">
                                            <p className="text-white text-sm sm:text-lg md:text-xl font-semibold text-center">
                                                Data início
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-xl w-full sm:w-[190px] min-h-[45px] flex items-center justify-center px-2">
                                            <p className="text-gray-400 text-base sm:text-xl md:text-2xl font-semibold text-center break-words">
                                                {dados.dataInicio}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex flex-col items-center gap-4 w-full">

                                        <div className="bg-[#4D4D4D] px-4 py-1">
                                            <p className="text-white text-sm sm:text-lg md:text-xl font-semibold text-center">
                                                Data Final
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-xl w-full sm:w-[190px] min-h-[45px] flex items-center justify-center px-2">
                                            <p className="text-gray-400 text-base sm:text-xl md:text-2xl font-semibold text-center break-words">
                                                {dados.dataFinal}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <div>

                            <div className="bg-[#4D4D4D] w-fit px-4 h-[32px] flex items-center justify-center shadow">
                                <p className="text-white font-semibold text-base sm:text-xl md:text-2xl">
                                    Especialidade:
                                </p>
                            </div>

                            <div className="mt-5 bg-white rounded-xl min-h-[50px] flex items-center justify-center shadow-inner px-2">

                                {editando ? (
                                    <select
                                        value={dados.especialidade}
                                        onChange={(e) => alterarValor("especialidade", e.target.value)}
                                        className="w-full min-h-[50px] rounded-xl text-[#3A3A3A] text-base sm:text-xl md:text-2xl font-bold text-center outline-none bg-white"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Gestão">Gestão</option>
                                        <option value="TI">TI</option>
                                        <option value="Elétrica">Elétrica</option>
                                        <option value="Mecânica">Mecânica</option>
                                        <option value="Segurança">Segurança</option>
                                    </select>
                                ) : (
                                    <p className="text-[#3A3A3A] text-base sm:text-xl md:text-2xl font-bold text-center break-words">
                                        {dados.especialidade}
                                    </p>
                                )}

                            </div>

                        </div>
                    )}

                    <div className="flex justify-center mt-3">

                        {editando ? (
                            <button
                                onClick={salvarEdicao}
                                className="w-[130px] sm:w-[170px] md:w-[180px] h-[50px] sm:h-[65px] md:h-[70px] bg-[#3D8D40] rounded-[20px] text-white text-xl sm:text-3xl md:text-4xl font-bold shadow-lg"
                            >
                                Salvar
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditando(true)}
                                className="w-[130px] sm:w-[170px] md:w-[180px] h-[50px] sm:h-[65px] md:h-[70px] bg-[#4D4D4D] rounded-[20px] text-white text-xl sm:text-3xl md:text-4xl font-bold shadow-lg"
                            >
                                Editar
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}