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
        className={`
          w-[240px] rounded-[24px] border-[3px] ${estilo.borda} p-5 bg-white shadow-xl flex flex-col items-center justify-center text-center transition-all scale-100
          md:w-[280px] md:rounded-[28px] md:p-6
          xl:w-[330px] xl:rounded-[32px] xl:p-7
        `}
      >
        <div className={`w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full ${estilo.iconeBg} flex items-center justify-center border-3 ${estilo.iconeCor} mb-4 xl:mb-5`}>
          <span className="text-xl md:text-2xl xl:text-3xl font-bold leading-none select-none">
            {estilo.simbolo}
          </span>
        </div>

        <h2 className={`text-lg md:text-xl xl:text-2xl font-bold ${estilo.corTitulo} tracking-tight`}>
          {titulo}
        </h2>

        <p className="mt-2 text-xs md:text-sm xl:text-base font-normal text-slate-500 leading-relaxed max-w-[240px] md:max-w-[280px]">
          {descricao}
        </p>
      </div>
    </div>
  );
}