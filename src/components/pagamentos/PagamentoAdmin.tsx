import React, { useState, useMemo, useEffect } from "react";
import CardPagamento from "./CardPagamento";
import CardComprovante from "./CardComprovante";
import "../Scrollbar/scrollbar.css";
import filtro from "../../assets/icons/icone_filtro.svg";
import { pagamentoAdminService, type IPagamento } from "../../Services/api";

const PagamentoAdmin = () => {
    const [lista, setLista] = useState<IPagamento[]>([]);
    const [filtro, setFiltro] = useState<"Todos" | "Pendentes" | "Aprovados" | "Reprovados">("Todos");
    const [showDropdown, setShowDropdown] = useState(false);
    const [itemParaModal, setItemParaModal] = useState<IPagamento | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carregarPagamentos = async () => {
        setLoading(true);
        setError(null);
        try {
            const pagamentos = await pagamentoAdminService.listarPagamentos(filtro);
            setLista(pagamentos);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar pagamentos. Verifique se o backend está rodando.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarPagamentos();
    }, [filtro]);

    const handleAtualizar = () => {
        carregarPagamentos();
    };

    const stats = useMemo(() => ({
        reprovados: lista.filter(p => p.status === "Reprovado").length,
        aprovados: lista.filter(p => p.status === "Aprovado").length,
        pendentes: lista.filter(p => p.status === "Pendente").length,
        total: lista.length
    }), [lista]);

    // ✅ Variável corrigida
    const dadosExibidos = lista;

    const handleApprove = async (id: number) => {
        try {
            await pagamentoAdminService.aprovarPagamento(id);
            setLista(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, status: "Aprovado" } : item
                )
            );
            setItemParaModal(null);
        } catch (err) {
            alert("Erro ao aprovar pagamento");
        }
    };

    const handleReject = async (id: number) => {
        try {
            await pagamentoAdminService.reprovarPagamento(id);
            setLista(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, status: "Reprovado" } : item
                )
            );
            setItemParaModal(null);
        } catch (err) {
            alert("Erro ao reprovar pagamento");
        }
    };

    return (
        <div className="bg-[#0F121D] min-h-screen flex flex-col pt-20 sm:pt-24 md:pt-28 overflow-hidden px-2 sm:px-4 md:px-0">
            <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 flex-1 min-h-0">
                <aside className="w-full lg:w-[415px] bg-white rounded-[15px] lg:rounded-r-[15px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl flex flex-col mb-2 lg:mb-0 shrink-0">
                    <div className="flex flex-col justify-between h-full gap-3 sm:gap-4 md:gap-6">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="bg-[#0F121D] text-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center gap-2 flex-1 min-h-[80px] sm:min-h-[90px] md:min-h-[100px] px-3 text-center">
                                <span className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem] font-bold capitalize">
                                    {key}: {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden px-2 sm:px-4 md:px-6 lg:pr-10 pt-4 sm:pt-6 md:pt-10">
                    <div className="mb-6 sm:mb-8 flex flex-col gap-4 flex-shrink-0 relative">
                        <div className="flex items-center justify-between gap-4">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)} 
                                className="flex items-center gap-3 sm:gap-5 md:gap-8 relative z-40"
                            >
                                <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <img
                                        src={filtro}
                                        alt="filtro"
                                        className="w-full h-full scale-[1.8] sm:scale-[2] md:scale-[2.5] transform object-contain md:-mr-15 translate-y-1 sm:translate-y-2 md:translate-y-3"
                                    />
                                </div>

                                <span className="text-white font-bold text-[1rem] sm:text-[1.1rem] md:text-xl ml-1 sm:ml-3 md:ml-6">
                                    {filtro}
                                </span>
                            </button>

                            <button
                                onClick={handleAtualizar}
                                className="bg-[#C83D3D] text-white rounded-full h-[38px] sm:h-[40px] md:h-[42px] px-4 sm:px-6 md:px-8 mr-0 md:mr-10 shadow-lg font-bold hover:bg-[#b03535] transition-all text-[0.9rem] sm:text-[1rem] md:text-lg whitespace-nowrap"
                            >
                                Atualizar
                            </button>
                        </div>

                        {showDropdown && (
                            <div className="absolute top-11 sm:top-12 md:top-13 left-0 bg-white rounded-xl shadow-2xl py-2 z-50 w-40 sm:w-44 md:w-48">
                                {["Todos", "Pendentes", "Aprovados", "Reprovados"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setFiltro(opt as any);
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 font-bold text-[#101625] text-[0.9rem] sm:text-[1rem]"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-scroll scroll-modern pr-1 sm:pr-2 mb-4 sm:mb-6">
                        {loading ? (
                            <div className="text-center py-20 text-white/60">Carregando pagamentos...</div>
                        ) : error ? (
                            <div className="text-center py-20 text-red-400">{error}</div>
                        ) : (
                            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                                {dadosExibidos.map((p) => (
                                    <CardPagamento
                                        key={p.id}
                                        data={p}
                                        onOpenComprovante={() => setItemParaModal(p)}
                                    />
                                ))}

                                {dadosExibidos.length === 0 && (
                                    <div className="text-center py-12 sm:py-16 md:py-20 text-white/40 font-bold uppercase text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]">
                                        Nenhum registro encontrado.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {itemParaModal && (
                <CardComprovante
                    data={itemParaModal}
                    onClose={() => setItemParaModal(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default PagamentoAdmin;