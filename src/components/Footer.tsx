function Footer() {
  return (
    <footer className="relative w-full bg-[#101625] py-8 sm:py-10">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(1,15,21,0.8),rgba(24,35,41,0.8),rgba(46,54,62,0.8),rgba(91,93,102,0.8))] pointer-events-none" />
      
      {/* Conteúdo por cima do gradiente */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 text-center">
        
        {/* Direitos Autorais */}
        <p className="font-black text-white text-sm sm:text-base tracking-wide">
          © 2026 AAPM SENAI MARIANO FERRAZ
        </p>

        {/* Divisor sutil opcional (se quiser tirar, basta deletar esta linha) */}
        <div className="w-16 h-[2px] bg-white/20 rounded-full" />

        {/* Desenvolvedores */}
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Desenvolvido por:
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-2xl leading-relaxed">
            Flavia Ribeiro <span className="text-[#93C2E5] mx-1.5">•</span> 
            Leticia Gomes <span className="text-[#FFF0A5] mx-1.5">•</span> 
            Maria Sales <span className="text-[#C83D3D] mx-1.5">•</span> 
            Maysa Soares <span className="text-[#93C2E5] mx-1.5">•</span> 
            Nicolly Almeida <span className="text-[#FFF0A5] mx-1.5">•</span>
            Pedro Lourenço
          </p>
        </div>

      </div>
    </footer>
  );  
}

export default Footer;