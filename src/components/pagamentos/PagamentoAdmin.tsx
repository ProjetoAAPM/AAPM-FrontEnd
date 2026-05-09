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

    const handleAtualizar = () => setFiltro("Todos");

    const stats = useMemo(() => ({
        reprovados: lista.filter(p => p.status === "Reprovado").length,
        aprovados: lista.filter(p => p.status === "Aprovado").length,
        pendentes: lista.filter(p => p.status === "Pendente").length,
        total: lista.length
    }), [lista]);

    const dadosExibidos = lista.filter(p => filtro === "Todos" || p.status === "Pendente");

    return (
        <div className="bg-[#0F121D] h-screen flex flex-col pt-28 overflow-hidden">
            <div className="w-full flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
                <aside className="w-full lg:w-[415px] bg-white rounded-r-[15px] p-10 shadow-xl flex flex-col mb-4 lg:mb-0 shrink-0">
                    <div className="flex flex-col justify-between h-full gap-6">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="bg-[#0F121D] text-white rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[100px]">
                                <span className="text-[22px] font-bold capitalize">{key}: {value}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden px-4 lg:pr-10 pt-10">
                    <div className="mb-8 flex flex-col gap-4 flex-shrink-0 relative">
                        <div className="flex items-center justify-between">
                            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-8 relative z-40">
                                <div className="relative flex items-center justify-center w-10 h-10">
                                    <img src="/src/assets/icons/icone_filtro.svg" alt="filtro" className="w-full h-full scale-[2.5] transform object-contain lg:-mr-15 translate-y-3" />
                                </div>
                                <span className="text-white font-bold text-xl ml-6">{filtro}</span>
                            </button>

                            <button onClick={handleAtualizar} className="bg-[#C83D3D] text-white rounded-full h-[42px] px-8 mr-10 shadow-lg font-bold hover:bg-[#b03535] transition-all text-lg">
                                Atualizar
                            </button>
                        </div>

                        {showDropdown && (
                            <div className="absolute top-13 left-0 bg-white rounded-xl shadow-2xl py-2 z-50 w-48">
                                {["Todos", "Pendentes"].map((opt) => (
                                    <button key={opt} onClick={() => { setFiltro(opt as any); setShowDropdown(false); }} className="w-full text-left px-5 py-3 hover:bg-gray-100 font-bold text-[#101625]">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-scroll scroll-modern pr-2 mb-6">
                        <div className="flex flex-col gap-5">
                            {dadosExibidos.map((p) => (
                                <CardPagamento key={p.id} data={p} onOpenComprovante={() => setItemParaModal(p)} />
                            ))}
                            {dadosExibidos.length === 0 && (
                                <div className="text-center py-20 text-white/40 font-bold uppercase">Nenhum registro encontrado.</div>
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