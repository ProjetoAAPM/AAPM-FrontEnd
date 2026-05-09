import React, { useState, useMemo } from "react";
import CardPagamento from "./CardPagamento";
import CardComprovante from "./CardComprovante";
import "../Scrollbar/scrollbar.css";

export interface IPagamento {
  id: number;
  nome: string;
  curso: string;
  valor: number;
  data: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
}

const MOCK_PAGAMENTOS: IPagamento[] = [
  { id: 1, nome: "Pedro Henrique", curso: "Tecnico Desenvolvimento de Sistemas", valor: 100.0, data: "12/03/2026", status: "Pendente" },
  { id: 2, nome: "Pedro Lucas", curso: "Tecnico Mecatronica", valor: 50.0, data: "06/03/2026", status: "Aprovado" },
  { id: 3, nome: "Leonardo Silva", curso: "Tecnico Eletrônica", valor: 100.0, data: "27/01/2025", status: "Reprovado" },
  { id: 4, nome: "João Vitor", curso: "Tecnico Administração", valor: 50.0, data: "22/07/2025", status: "Pendente" },
  { id: 5, nome: "Jefferson Mendes", curso: "Tecnico Logistica", valor: 50.0, data: "21/12/2025", status: "Aprovado" },
];

const PagamentoAdmin = () => {
  const [lista, setLista] = useState<IPagamento[]>(MOCK_PAGAMENTOS);
  const [filtro, setFiltro] = useState<"Todos" | "Pendentes">("Todos");
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemParaModal, setItemParaModal] = useState<IPagamento | null>(null);

  const stats = useMemo(() => {
    const counts = {
      reprovados: lista.filter(p => p.status === "Reprovado").length,
      aprovados: lista.filter(p => p.status === "Aprovado").length,
      pendentes: lista.filter(p => p.status === "Pendente").length,
      total: lista.length
    };
    console.log("Contagem atual:", counts);
    return counts;
  }, [lista]);

  const dadosExibidos = lista.filter(p => {
    if (filtro === "Todos") return true;
    return p.status === "Pendente"; 
  });

  const handleAtualizar = () => {
    setFiltro("Todos");
  };

  const filtroOptions = [
    { label: "Todos", value: "Todos" },
    { label: "Pendentes", value: "Pendentes" },
  ];

  return (
    <div className="bg-[#0F121D] min-h-screen flex flex-col pt-25">
      <div className="w-full flex flex-col lg:flex-row gap-15">

        <aside className="w-full lg:w-[465px] bg-white rounded-r-[10px] p-15 shadow-xl flex flex-col mt-auto mb-[10px] min-h-[700px]">
          <div className="flex flex-col justify-between h-full gap-6">
            <div className="bg-[#0F121D] text-white rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[120px]">
              <span className="text-[22px] font-bold">Reprovados:</span>
              <span className="text-[22px] font-bold">{stats.reprovados}</span>
            </div>
            <div className="bg-[#0F121D] text-white rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[120px]">
              <span className="text-[22px] font-bold">Aprovados:</span>
              <span className="text-[22px] font-bold">{stats.aprovados}</span>
            </div>
            <div className="bg-[#0F121D] text-white rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[120px]">
              <span className="text-[22px] font-bold">Pendente:</span>
              <span className="text-[22px] font-bold">{stats.pendentes}</span>
            </div>
            <div className="bg-[#0F121D] text-white rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[120px]">
              <span className="text-[22px] font-bold">Total:</span>
              <span className="text-[22px] font-bold">{stats.total}</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-20 rounded-3xl lg:p-9 shadow-2xl flex flex-col min-h-[75vh]">

          <div className="mb-8 flex items-center justify-between relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center"
            >
              <div className="w-26 h-5 flex items-center justify-center">
                <img
                  src="/src/assets/icons/icone_filtro.svg"
                  alt="filtro"
                  className="w-32 h-32"
                />
              </div>
              <div className="font-bold text-white -mt-5 text-xl">
                {filtro}
              </div>
            </button>

            <button
              onClick={handleAtualizar}
              className="hidden lg:flex lg:mr-[140px] lg:-mt-[15px] items-center justify-center bg-[#C83D3D] text-white rounded-full h-[42px] shadow-lg font-semibold hover:bg-[#b03535] transition-all w-[130px] xl:w-[160px] text-base xl:text-lg"
            >
              Atualizar
            </button>

            {showDropdown && (
              <div className="absolute top-[68px] left-0 bg-white rounded-2xl shadow-2xl py-2 z-50 w-60 border border-gray-100">
                {filtroOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFiltro(opt.value as any);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 hover:bg-gray-100 transition-all text-[#101625] font-medium
                      ${filtro === opt.value ? 'bg-gray-100 font-black' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <div className=" h-full w-full max-w-[calc(100%-100px)] overflow-y-scroll scroll-modern pr-6 space-y-10">
              {dadosExibidos.map((p) => (
                <CardPagamento
                  key={p.id}
                  data={p}
                  onOpenComprovante={() => setItemParaModal(p)}
                />
              ))}

              {dadosExibidos.length === 0 && (
                <div className="text-center py-20 text-white/40 font-medium">
                  Nenhum registro encontrado.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {itemParaModal && (
        <CardComprovante
          data={itemParaModal}
          onClose={() => setItemParaModal(null)}
          onApprove={(id) => {
            setLista(prev => prev.map(item => item.id === id ? { ...item, status: "Aprovado" } : item));
            setItemParaModal(null);
          }}
          onReject={(id) => {
            setLista(prev => prev.map(item => item.id === id ? { ...item, status: "Reprovado" } : item));
            setItemParaModal(null);
          }}
        />
      )}
    </div>
  );
};

export default PagamentoAdmin;