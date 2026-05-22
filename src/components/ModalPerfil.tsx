import perfil1 from "../assets/perfis/user1.png";
import perfil2 from "../assets/perfis/user2.png";
import perfil3 from "../assets/perfis/user3.png";

import type { Usuario } from "../types/Usuario";

import { useState, useEffect } from "react";

type ModalPerfilProps = {
  perfilOpen: boolean;
  setPerfilOpen: React.Dispatch<React.SetStateAction<boolean>>;
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
};

export default function ModalPerfil({
  perfilOpen,
  setPerfilOpen,
  usuario,
  setUsuario,
}: ModalPerfilProps) {
  const fotosPerfil = [perfil1, perfil2, perfil3];

  const [editando, setEditando] = useState(false);

  const [dados, setDados] = useState<Usuario>({
    nome: "",
    foto: perfil1,
    tipo_usuario: "aluno",
    premium: false,
    curso: "",
    especialidade: "",
    dataInicio: "",
    dataFinal: "",
  });

  useEffect(() => {
    if (usuario) {
      setDados({
        nome: usuario.nome || "",
        curso: usuario.curso || "",
        especialidade: usuario.especialidade || "",
        tipo_usuario: usuario.tipo_usuario || "aluno",
        foto: usuario.foto || perfil1,
        dataInicio: usuario.dataInicio || "",
        dataFinal: usuario.dataFinal || "",
        premium: usuario.premium || false,
      });
    }
  }, [usuario]);

  function alterarValor(campo: keyof Usuario, valor: string) {
    setDados((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function salvarEdicao() {
    setUsuario(dados);
    setEditando(false);
  }

  if (!usuario || !perfilOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-start justify-end overflow-y-auto">

      <div
        className="
          w-full
          max-w-full
          sm:max-w-[430px]
          md:max-w-[500px]

          min-h-screen
          sm:min-h-fit

          rounded-none
          sm:rounded-l-[5px]

          bg-gradient-to-r
          from-[#1D2235]
          via-[#4B4D57]
          to-[#1F2A33]

          shadow-2xl
          relative

          pb-10
        "
      >

        <button
          onClick={() => setPerfilOpen(false)}
          className="
            absolute
            top-3
            right-4

            text-white

            text-4xl
            sm:text-5xl

            cursor-pointer

            z-20
          "
        >
          ×
        </button>

        <div className="flex flex-col items-center pt-14 sm:pt-12">

          <div className="p-[5px] rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFF4B0] to-[#C9A227]">
            <img
              src={dados.foto}
              className="
                w-28 h-28
                sm:w-36 sm:h-36
                md:w-40 md:h-40

                rounded-full
                object-cover
              "
            />
          </div>

          {editando && (
            <div className="flex gap-3 mt-5 flex-wrap justify-center px-4">
              {fotosPerfil.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  onClick={() => alterarValor("foto", foto)}
                  className={`
                    w-12 h-12
                    sm:w-14 sm:h-14

                    rounded-full
                    cursor-pointer
                    border-4
                    transition-all

                    ${
                      dados.foto === foto
                        ? "border-white scale-105"
                        : "border-transparent"
                    }
                  `}
                />
              ))}
            </div>
          )}

          <div
            className="
              mt-5

              bg-[#4D4D4D]

              w-[90%]
              max-w-[320px]

              min-h-[48px]

              flex
              items-center
              justify-center

              rounded-md

              px-4
            "
          >
            {editando ? (
              <input
                value={dados.nome}
                onChange={(e) => alterarValor("nome", e.target.value)}
                className="
                  w-full
                  bg-transparent
                  text-white
                  text-center
                  text-lg
                  outline-none
                "
              />
            ) : (
              <p className="text-white font-semibold text-center text-lg">
                {dados.nome}
              </p>
            )}
          </div>
        </div>

        <div
          className="
            px-5
            sm:px-8

            mt-10

            flex
            flex-col

            gap-8
          "
        >

          {dados.tipo_usuario === "aluno" ? (
            <div>
              <p className="text-white font-bold text-lg">
                Curso:
              </p>

              <div className="mt-3 bg-white rounded-xl p-3">
                {editando ? (
                  <input
                    value={dados.curso}
                    onChange={(e) => alterarValor("curso", e.target.value)}
                    className="
                      w-full
                      text-center
                      text-base
                      outline-none
                    "
                  />
                ) : (
                  <p className="text-center font-bold text-[#3A3A3A] text-base">
                    {dados.curso}
                  </p>
                )}
              </div>

              <p className="text-white font-bold mt-8 text-lg">
                Duração:
              </p>

              <div className="flex justify-between gap-4 mt-4">
                <div className="bg-white rounded-xl p-3 w-full text-center font-semibold">
                  {dados.dataInicio}
                </div>

                <div className="bg-white rounded-xl p-3 w-full text-center font-semibold">
                  {dados.dataFinal}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-white font-bold text-lg">
                Especialidade:
              </p>

              <div className="mt-3 bg-white rounded-xl p-3">
                {editando ? (
                  <input
                    value={dados.especialidade}
                    onChange={(e) =>
                      alterarValor("especialidade", e.target.value)
                    }
                    className="
                      w-full
                      text-center
                      text-base
                      outline-none
                    "
                  />
                ) : (
                  <p className="text-center font-bold text-[#3A3A3A] text-base">
                    {dados.especialidade}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center pt-2">
            {editando ? (
              <button
                onClick={salvarEdicao}
                className="
                  bg-[#363636]
                  text-white

                  px-12
                  py-3

                  rounded-xl

                  font-bold
                  text-lg

                  hover:scale-105
                  transition-all
                "
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={() => setEditando(true)}
                className="
                  bg-[#363636]
                  text-white

                  px-12
                  py-3

                  rounded-xl

                  font-bold
                  text-lg

                  hover:scale-105
                  transition-all
                "
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