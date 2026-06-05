import { useEffect } from "react";

type AlertProps = {
  aberto: boolean;
  fechar: () => void;
  tipo: "sucesso" | "erro";
  titulo: string;
  descricao: string;
  duracao?: number;
};

export default function Alert({
  aberto,
  fechar,
  tipo,
  titulo,
  descricao,
  duracao = 3000,
}: AlertProps) {
  
  useEffect(() => {
    if (aberto && duracao > 0) {
      const timer = setTimeout(() => {
        fechar();
      }, duracao);
      return () => clearTimeout(timer);
    }
  }, [aberto, duracao, fechar]);

  if (!aberto) return null;

  const configuracao = {
    sucesso: {
      borda: "border-[#7ED957]",
      corTitulo: "text-[#1E293B]",
      iconeBg: "bg-white",
      iconeCor: "text-[#A5DC86]",
      iconeBorda: "border-[#E5F4DB]",
      simbolo: "✓",
    },
    erro: {
      borda: "border-[#D95757]",
      corTitulo: "text-[#1E293B]",
      iconeBg: "bg-white",
      iconeCor: "text-[#DC8686]",
      iconeBorda: "border-[#F4DBDB]",
      simbolo: "✕",
    },
  };

  const estilo = configuracao[tipo];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4 animate-fade-in">
      
      <div
        className={`w-[90%] sm:w-full max-w-[400px] bg-white rounded-[24px] sm:rounded-[32px] border-[3px] ${estilo.borda} p-5 sm:p-6 shadow-xl flex flex-col items-center justify-center text-center transition-all scale-100`}
      >
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${estilo.iconeBg} flex items-center justify-center border-3 ${estilo.iconeCor} mb-4 sm:mb-5`}>
          <span className="text-2xl sm:text-3xl font-bold leading-none select-none">
            {estilo.simbolo}
          </span>
        </div>

        <h2 className={`text-xl sm:text-2xl font-bold ${estilo.corTitulo} tracking-tight`}>
          {titulo}
        </h2>

        <p className="mt-2 text-xs sm:text-sm md:text-base font-normal text-slate-500 leading-relaxed max-w-xs">
          {descricao}
        </p>
      </div>
    </div>
  );
}