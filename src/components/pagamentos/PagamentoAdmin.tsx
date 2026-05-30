import { useState, useMemo, useEffect } from "react";
import CardPagamento from "./CardPagamento";
import CardComprovante from "./CardComprovante";
import "../Scrollbar/scrollbar.css";
import filtroIcon from "../../assets/icons/icone_filtro.svg";
import {
    pagamentoAdminService,
    verificarAdminHome,
    type IPagamento
} from "../../Services/api";

const PagamentoAdmin = () => {
    const [lista, setLista] = useState<IPagamento[]>([]);
    const [filtro, setFiltro] = useState<"Todos" | "Pendentes" | "Aprovados" | "Reprovados">("Todos");
    const [showDropdown, setShowDropdown] = useState(false);
    const [itemParaModal, setItemParaModal] = useState<IPagamento | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const carregarPagamentos = async () => {
        setLoading(true);
        setError(null);
        try {
            let filtroApi = filtro;
            if (filtro === "Pendentes") filtroApi = "Pendente" as any;
            if (filtro === "Aprovados") filtroApi = "Aprovado" as any;
            if (filtro === "Reprovados") filtroApi = "Reprovado" as any;

            const pagamentos = await pagamentoAdminService.listarPagamentos(filtroApi);
            setLista(pagamentos);
        } catch (err: any) {
            console.error("Erro ao carregar pagamentos:", err);
            setError(err.message || "Erro ao carregar pagamentos");
            setLista([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function iniciarPagina() {
            try {
                await verificarAdminHome();
                await carregarPagamentos();
            } catch {
                alert("Acesso negado");
                window.location.href = "/login";
            }
        }
        iniciarPagina();
    }, [filtro]);

    const handleAtualizar = () => {
        carregarPagamentos();
    };

    const stats = useMemo(() => ({
        reprovados: lista.filter((p) => p.status === "Reprovado").length,
        aprovados: lista.filter((p) => p.status === "Aprovado").length,
        pendentes: lista.filter((p) => p.status === "Pendente").length,
        total: lista.length
    }), [lista]);

    const handleApprove = async (id: number) => {
        setIsApproving(true);
        try {
            await pagamentoAdminService.aprovarPagamento(id);
            await carregarPagamentos();
            setItemParaModal(null);
        } catch (err: any) {
            alert(err.message || "Erro ao aprovar pagamento");
        } finally {
            setIsApproving(false);
        }
    };

    const handleReject = async (id: number) => {
        setIsRejecting(true);
        try {
            await pagamentoAdminService.reprovarPagamento(id);
            await carregarPagamentos();
            setItemParaModal(null);
        } catch (err: any) {
            alert(err.message || "Erro ao reprovar pagamento");
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <div className="bg-[#0F121D] min-h-screen flex flex-col pt-24 md:pt-28 px-3 md:px-6 min-[1330px]:h-screen min-[1330px]:w-screen min-[1330px]:pt-20 min-[1330px]:overflow-hidden min-[1330px]:px-0">
            
            <div className="w-full flex flex-col gap-6 flex-1 pb-6 min-[1330px]:flex-row min-[1330px]:gap-8 min-[1330px]:min-h-0 min-[1330px]:h-full min-[1330px]:h-[calc(100vh-140px)] min-[1330px]:pb-4">

                <aside className="w-full bg-white rounded-[15px] p-4 md:p-6 shadow-xl flex flex-col min-[1330px]:w-[415px] min-[1330px]:rounded-none min-[1330px]:rounded-r-[15px] min-[1330px]:p-10 min-[1330px]:h-full min-[1330px]:mb-2 min-[1330px]:-mt">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 min-[1330px]:flex min-[1330px]:flex-col min-[1330px]:justify-end min-[1330px]:gap-10 min-[1330px]:lg:mt-4">
                        
                        {Object.entries(stats).map(([key, value]) => (
                            <div
                                key={key}
                                className="bg-[#0F121D] text-white rounded-[15px] flex items-center justify-center gap-2 h-16 md:h-20 min-[1330px]:rounded-[20px] min-[1330px]:min-h-[100px] min-[1330px]:px-3 text-center"
                            >
                                <span className="text-[1rem] md:text-[1.1rem] min-[1330px]:text-[1.3rem] font-bold capitalize">
                                    {key}: {value}
                                </span>
                            </div>
                        ))}

                    </div>
                </aside>

                <main className="flex-1 flex flex-col min-[1330px]:min-h-0 min-[1330px]:overflow-hidden min-[1330px]:px-0 min-[1330px]:lg:pr-10">
    
                    <div className="flex flex-col gap-4 flex-shrink-0 relative mb-3 min-[1330px]:mb-0">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-row items-center gap-2 relative z-40">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="w-12 h-12 md:w-12 md:h-12 cursor-pointer min-[1330px]:w-16 min-[1330px]:h-16 min-[1330px]:lg:mt-3"
                                    aria-label="Filtro"
                                >
                                    <img
                                        src={filtroIcon}
                                        alt="ícone filtro"
                                        className="w-full h-full transform object-contain"
                                    />
                                </button>
                                <span className="text-white font-bold text-[1rem] md:text-xl min-[1330px]:text-xl min-[1330px]:lg:mt-3">
                                    {filtro}
                                </span>
                            </div>

                            <button
                                disabled={loading}
                                onClick={handleAtualizar}
                                className={`bg-[#C83D3D] text-white rounded-full h-[38px] md:h-[42px] px-5 md:px-8 shadow-lg font-bold hover:bg-[#b03535] transition-all text-[0.9rem] md:text-lg ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Carregando..." : "Atualizar"}
                            </button>
                        </div>

                        {showDropdown && (
                            <div className="absolute top-12 md:top-14 left-0 bg-white rounded-xl shadow-2xl py-2 z-50 w-40 md:w-48 min-[1330px]:top-15 md:translate-y-3">
                                {["Todos", "Pendentes", "Aprovados", "Reprovados"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setFiltro(opt as any);
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 md:px-5 py-2 md:py-3 hover:bg-gray-100 font-bold text-[#101625] text-[0.9rem] md:text-[1rem]"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-white rounded-[12px] shadow-inner overflow-hidden flex flex-col min-h-[400px] min-[1330px]:min-h-0">
                        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                            <div className="flex-1 min-h-0 overflow-y-auto scroll-modern p-4 md:p-5">
                                {loading && lista.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        Carregando pagamentos...
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                                        <p className="text-red-500 mb-4 text-lg">
                                            {error}
                                        </p>
                                        <button
                                            onClick={handleAtualizar}
                                            className="bg-[#C83D3D] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b03535] transition"
                                        >
                                            Tentar novamente
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 md:gap-5 pb-4">
                                        {lista.map((p) => (
                                            <CardPagamento
                                                key={p.id}
                                                data={p}
                                                onOpenComprovante={() => setItemParaModal(p)}
                                            />
                                        ))}
                                        {lista.length === 0 && (
                                            <div className="text-center py-20 text-gray-400 font-bold uppercase text-[1rem]">
                                                Nenhum registro encontrado.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {itemParaModal && (
                <CardComprovante
                    data={itemParaModal}
                    onClose={() => setItemParaModal(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    isApproving={isApproving}
                    isRejecting={isRejecting}
                    isLoading={isApproving || isRejecting}
                />
            )}
        </div>
    );
};

export default PagamentoAdmin;