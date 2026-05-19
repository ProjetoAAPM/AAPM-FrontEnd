export default function ModalSucesso({
  aberto,
  fechar,
}: {
  aberto: boolean;
  fechar: () => void;
}) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[6px]">
      <div className="w-full max-w-5xl rounded-[40px] bg-[#73B36B] p-[10px] shadow-2xl">
        
        <div className="rounded-[34px] bg-[#F2F2F2] px-6 py-10 md:px-10 mt-10">
          
          <h1
            className="
              text-center
              text-3xl
              font-extrabold
              text-[#5E9F57]
              drop-shadow-[0_4px_0_rgba(0,0,0,0.18)]
              md:text-6xl
            "
          >
            Sua sugestão foi enviada com sucesso!
          </h1>

          <p
            className="
              mt-8
              text-center
              text-lg
              font-bold
              text-black
              md:text-3xl
            "
          >
            Agradecemos sua{" "}
            <span className="text-[#2F9B47]">contribuição</span> para
            melhorar a experiência com a AAPM.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={fechar}
              className="
                w-full
                max-w-[330px]
                rounded-full
                bg-[#24933C]
                py-3
                text-2xl
                font-bold
                text-white
                shadow-[0_6px_10px_rgba(0,0,0,0.25)]
                transition-all
                hover:scale-105
                hover:bg-[#1E7D33]
              "
            >
              Fechar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}