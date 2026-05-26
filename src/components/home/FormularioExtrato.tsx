import { useEffect, useState } from "react";
import "../Scrollbar/scrollbar.css";
import FormularioCard from "./admin/FormularioCard";
import { formularioService, type FormularioData } from "../../Services/formularioService";
import { BACKEND_ATIVO } from "../../config/admin/backend";

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
  extrato: ItemExtrato[];
}

export default function FormularioExtrato({ modoAdmin = false, extrato = [] }: FormularioExtratoProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularios, setFormularios] = useState<FormularioData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarFormularios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await formularioService.listarFormularios();
      setFormularios(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao carregar formulários");
      setFormularios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFormularios();
  }, []);

  const formulariosFuturos = formularios.filter((formulario) => {
    const dataEvento = new Date(`${formulario.data}T${formulario.hora}`);
    return dataEvento >= new Date();
  });

  const salvarFormulario = async (dados: FormularioData) => {
    try {
      await formularioService.criarFormulario(dados);
      alert("Formulário saved com sucesso!");
      setMostrarFormulario(false);
      carregarFormularios();
    } catch (err) {
      alert("Erro ao salvar formulário");
    }
  };

  const atualizarFormulario = async (id: number, dados: Partial<FormularioData>) => {
    try {
      await formularioService.atualizarFormulario(id, dados);
      carregarFormularios();
    } catch (err) {
      alert("Erro ao atualizar");
    }
  };

  const excluirFormulario = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este formulário?")) return;
    try {
      await formularioService.deletarFormulario(id);
      carregarFormularios();
    } catch (err) {
      alert("Erro ao excluir formulário");
    }
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-3 lg:h-[95vh] w-full">
        <div className={`bg-[#DDF4FF] ${modoAdmin ? "w-full" : "w-full lg:w-3/4"} h-[650px] sm:h-[700px] lg:h-[95vh] rounded-[15px] shadow-2xl flex flex-col px-4 sm:px-6 md:px-10 py-6 relative overflow-hidden`}>
          <div className="absolute top-3 sm:top-10 left-0 bg-white text-[#101625] text-[1.2rem] min-[350px]:text-[1.4rem] sm:text-[2rem] md:text-[3rem] font-black px-8 sm:px-[150px] md:px-[200px] lg:px-[250px] py-1 rounded-r-[10px] shadow-md whitespace-nowrap">
            Formulários
          </div>

          <div className="mt-[90px] sm:mt-[130px] md:mt-[180px] lg:mt-[160px] w-full flex flex-col flex-1 min-h-0">
            {modoAdmin && (
              <div className="w-full flex justify-end mb-4">
                <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="bg-[#C83D3D] text-white rounded-full px-6 py-3 font-bold hover:brightness-95 transition-all">
                  {mostrarFormulario ? "Cancelar" : "Criar Formulário"}
                </button>
              </div>
            )}

            <div className="bg-white rounded-[12px] shadow-md w-full flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto scroll-modern px-4 py-4 space-y-4">
                {loading ? (
                  <div className="text-center py-20 text-gray-500">
                    Carregando formulários...
                  </div>
                ) : (
                  <>
                    {modoAdmin && mostrarFormulario && (
                      <FormularioCard onSalvar={salvarFormulario} somenteVisualizacao={false} />
                    )}

                    {(modoAdmin ? formularios : formulariosFuturos).map((formulario) => (
                      <FormularioCard key={formulario.id} dadosIniciais={formulario} somenteVisualizacao={!modoAdmin} onSalvar={(dados) => atualizarFormulario(formulario.id!, dados)} onExcluir={() => excluirFormulario(formulario.id!)} />
                    ))}

                    {formularios.length === 0 && !mostrarFormulario && (
                      <div className="py-32 flex items-center justify-center text-gray-500 font-semibold">
                        Nenhum formulário cadastrado ainda.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!modoAdmin && (
          <div className="bg-[#BBE1FE] w-full lg:w-1/4 min-h-[400px] sm:min-h-[500px] lg:h-full rounded-[15px] shadow-2xl p-3 sm:p-4 relative flex flex-col overflow-hidden">
            <div className="absolute top-6 sm:top-10 right-0 bg-white text-[#101625] text-[1.2rem] sm:text-[2rem] md:text-[1.5rem] font-black px-6 sm:px-[100px] md:px-[200px] lg:px-[90px] py-1 rounded-l-[10px] shadow-md whitespace-nowrap">
              Extrato
            </div>

            <div className="mt-[80px] sm:mt-[110px] md:mt-[130px] flex-1 rounded-[10px] bg-[#BBE1FE] overflow-hidden min-h-0">
              <div className="h-full overflow-y-auto scroll-modern pr-2 sm:pr-3">
                <div className="p-2 sm:p-4 space-y-3">
                  {extrato.map((item, i) => (
                    <div key={i} className="bg-[#FFFFFF] rounded-[8px] p-3 shadow-sm flex justify-between items-center gap-3">
                      {item.tipo === "premio" && (
                        <div>
                          <p className="text-[12px] sm:text-[14px] font-semibold text-yellow-700">
                            Prêmio desbloqueado
                          </p>
                          <p className="text-[13px] sm:text-[15px] font-bold text-black">
                            {item.premio}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}