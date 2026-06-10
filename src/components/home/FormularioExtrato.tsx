import { useEffect, useState } from "react";
import "../Scrollbar/scrollbar.css";
import FormularioCard from "./admin/FormularioCard";
import Alert from "../../alerts/Alert";
import {
  formularioService,
  type FormularioData,
} from "../../Services/formularioService";
import { Star } from "lucide-react";

interface ItemExtrato {
  tipo: "premio" | "pontos" | "resgate" | "ganho";
  premio?: string;
  mensagem?: string;
  descricao?: string;
  valor?: number;
  pontos?: number;
}

interface FormularioExtratoProps {
  modoAdmin?: boolean;
  extrato?: ItemExtrato[];
  premium?: boolean;
}

export default function FormularioExtrato({
  modoAdmin = false,
  extrato = [],
  premium = false,
}: FormularioExtratoProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularios, setFormularios] = useState<FormularioData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alerta, setAlerta] = useState({aberto: false, tipo: "sucesso" as "sucesso" | "erro", titulo: "", descricao: "", });

  const carregarFormularios = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await formularioService.listarFormularios();

      console.log("FORMULÁRIOS RECEBIDOS:", data);
      console.log("TOTAL:", data?.length);

      setFormularios(data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar formulários");
      setFormularios([]);
    } finally {
      setLoading(false);
    }
  };

  const salvarFormulario = async (dados: FormularioData) => {
    try {
      await formularioService.criarFormulario(dados);

      await carregarFormularios();

      dispararAlerta(
        "sucesso",
        "Sucesso!",
        "Formulário salvo com sucesso."
      );
      setMostrarFormulario(false);
    } catch (err) {
      console.error(err);
        dispararAlerta(
          "erro",
          "Falha ao salvar",
          "Não foi possível salvar o formulário."
        );
    }
  };

  const atualizarFormulario = async (id: number, dados: Partial<FormularioData>) => {
    try {
      await formularioService.atualizarFormulario(id, dados);
      carregarFormularios();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar");
    }
  };

  const excluirFormulario = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este formulário?")) {
      return;
    }
    try {
      await formularioService.deletarFormulario(id);
      setFormularios((prev) => prev.filter((formulario) => formulario.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir formulário");
    }
  };

  const formulariosFuturos = formularios.filter((formulario) => {
    if (!formulario.data || !formulario.hora) {
      console.log(
        "DATA OU HORA VAZIA",
        formulario
      );
      return false;
    }

    const dataEvento = new Date(
      `${formulario.data}T${formulario.hora}`
    );

    const valido =
      !isNaN(dataEvento.getTime()) &&
      dataEvento >= new Date();

    console.log({
      titulo: formulario.titulo,
      data: formulario.data,
      hora: formulario.hora,
      dataEvento,
      agora: new Date(),
      valido,
    });

    return valido;
  });

  const listaRenderizada = modoAdmin ? formularios : formulariosFuturos;

  const dispararAlerta = (
    tipoAlerta: "sucesso" | "erro",
    titulo: string,
    descricao: string
  ) => {
    setAlerta({
      aberto: true,
      tipo: tipoAlerta,
      titulo,
      descricao,
    });
  };

  return (
    <>
      <Alert
        aberto={alerta.aberto}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
        fechar={() =>
          setAlerta((prev) => ({
            ...prev,
            aberto: false,
          }))
        }
      />
    <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 min-[1330px]:px-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:h-[95vh] w-full">
        
        <div
          className={`bg-[#DDF4FF] ${
            modoAdmin ? "w-full" : "w-full lg:w-3/4"
          } h-[580px] min-[360px]:h-[620px] sm:h-[700px] lg:h-[95vh] rounded-[15px] shadow-2xl flex flex-col px-3 min-[360px]:px-4 sm:px-6 md:px-10 py-6 relative overflow-hidden`}
        >
          <div className="absolute top-3 sm:top-10 left-0 bg-white text-[#101625] text-[1.1rem] min-[360px]:text-[1.2rem] sm:text-[2rem] md:text-[3rem] font-black px-6 min-[360px]:px-8 sm:px-[150px] md:px-[200px] lg:px-[250px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
            Formulários
          </div>

          <div className="mt-[75px] min-[360px]:mt-[90px] sm:mt-[130px] md:mt-[180px] lg:mt-[160px] w-full flex flex-col items-center flex-1 min-h-0">
            {modoAdmin && (
              <div className="self-center sm:ml-auto md:mr-[70px] xl:mr-[190px] 2xl:mr-[210px] mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <button
                  onClick={() => setMostrarFormulario(!mostrarFormulario)}
                  className="bg-[#C83D3D] hover:bg-[#b03535] transition-all text-white font-bold rounded-full
                  px-4 min-[360px]:px-5 sm:px-6 md:px-7 md:text-lg py-1
                  text-sm min-[360px]:text-base sm:text-lg
                  min-w-[110px] min-[360px]:min-w-[120px] md:min-w-[156px]
                  whitespace-nowrap border border-transparent shadow-sm transform -translate-y-3 sm:translate-y-4 md:translate-y-3"
                >
                  {mostrarFormulario ? "Cancelar" : "Criar Formulário"}
                </button>
              </div>
            )}

            <div className="bg-white rounded-[12px] shadow-md w-full max-w-[95%] sm:max-w-[800px] md:max-w-[1100px] lg:max-w-[1300px] mx-auto h-[340px] min-[360px]:h-[380px] sm:h-[420px] md:h-[340px] lg:h-[380px] xl:h-[550px] flex flex-col overflow-hidden relative">

                <div className="flex justify-end px-3 min-[360px]:px-4 pt-3 pb-4 flex-shrink-0">
                  <button
                    onClick={carregarFormularios}
                    disabled={loading}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:scale-95 transition-all duration-200 disabled:opacity-50"
                    title="Atualizar formulários"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${loading ? "animate-spin" : ""}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                </div>

              <div className="flex-1 overflow-y-auto scroll-modern px-3 min-[360px]:px-4 pb-10 sm:pb-14 space-y-4">
                {loading && formularios.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    Carregando formulários...
                  </div>
                ) : error ? (
                  <div className="text-center py-20 text-red-500 font-semibold">
                    {error}
                  </div>
                ) : (
                  <>
                    {modoAdmin && mostrarFormulario && (
                      <FormularioCard
                        onSalvar={salvarFormulario}
                        somenteVisualizacao={false}
                      />
                    )}

                    {listaRenderizada.map((formulario) => (
                      <FormularioCard
                        key={formulario.id}
                        dadosIniciais={formulario}
                        somenteVisualizacao={!modoAdmin}
                        onSalvar={(dados) => atualizarFormulario(formulario.id!, dados)}
                        onExcluir={() => excluirFormulario(formulario.id!)}
                      />
                    ))}

                      {listaRenderizada.length === 0 && !mostrarFormulario && (
                        <div className="absolute inset-0 flex items-center justify-center text-center px-4 text-gray-500 font-semibold text-sm sm:text-base translate-y-[10px] sm:translate-y-[15px] lg:-translate-y-[5px]">  
                        {modoAdmin
                          ? "Nenhum formulário cadastrado ainda."
                          : "Novos formulários aparecerão aqui quando forem publicados."}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!modoAdmin && (
          <div className="bg-[#BBE1FE] w-full lg:w-1/4 min-h-[350px] min-[360px]:min-h-[400px] sm:min-h-[500px] lg:h-full rounded-[15px] shadow-2xl p-3 sm:p-4 relative flex flex-col overflow-hidden">
            <div className="absolute top-4 sm:top-10 right-0 bg-white text-[#101625] text-[1.1rem] min-[360px]:text-[1.4rem] sm:text-[2rem] md:text-[1.5rem] font-black px-5 min-[360px]:px-6 sm:px-[100px] md:px-[200px] lg:px-[90px] py-1 rounded-l-[10px] shadow-md whitespace-nowrap">
              Extrato
            </div>

            <div className="mt-[70px] min-[360px]:mt-[80px] sm:mt-[110px] md:mt-[130px] flex-1 rounded-[10px] bg-[#BBE1FE] overflow-hidden min-h-0">
              <div className="h-full overflow-y-auto scroll-modern pr-1 sm:pr-3">
                <div className="p-1 sm:p-4 space-y-3">
                  {extrato.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#FFFFFF] rounded-[8px] p-2.5 sm:p-3 shadow-sm flex justify-between items-center gap-2 sm:gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        {item.tipo === "pontos" && (
                          <div className="flex justify-between items-end w-full gap-1">
                            <div className="min-w-0">
                              <p className="text-[13px] sm:text-[16px] font-black text-black truncate">
                                {item.mensagem || "Ganho de pontos"}
                              </p>
                              <p className={`text-[11px] sm:text-[15px] font-bold mt-0.5 truncate ${premium ? "text-yellow-600" : "text-slate-500"}`}>
                                {premium ? "Plano Premium" : "Pagamento do plano Comum"}
                              </p>
                              {item.descricao && (
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                  {item.descricao}
                                </p>
                              )}
                            </div>
                            <span className="text-green-600 font-black text-[14px] sm:text-[18px] shrink-0 pb-0.5 whitespace-nowrap">
                              +{item.pontos || item.valor}p
                            </span>
                          </div>
                        )}

                        {item.tipo === "premio" && (
                          <div className="min-w-0">
                            <p className={`text-[11px] sm:text-[14px] font-semibold ${premium ? "text-yellow-600" : "text-slate-500"}`}>
                              Prêmio desbloqueado
                            </p>
                            <p className="text-[12px] sm:text-[15px] font-bold text-black truncate">
                              {item.premio}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="shrink-0">
                        {(item.tipo === "resgate" || item.tipo === "premio") && (
                          <Star
                            className={`w-4 h-4 sm:w-6 sm:h-6 ${premium ? "text-[#B8860B] fill-[#DAA520] drop-shadow-[0_1px_3px_rgba(234,179,8,0.5)]" : "text-[#C4C4C4] fill-[#C0C0C0] opacity-40"}`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}