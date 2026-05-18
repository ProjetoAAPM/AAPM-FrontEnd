import Swal from 'sweetalert2';

function Copiador({ children, textoParaCopiar }) {
    
    const dispararAlerta = async () => {
        try {
            await navigator.clipboard.writeText(textoParaCopiar);
            
            Swal.fire({
                title: 'Copiado!',
                text: 'Chave Pix copiada com sucesso.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                width: '85%', 
                
                customClass: {
                    popup: '!rounded-[24px] !border-2 !border-[#7ed957] !shadow-2xl !bg-white !max-w-[240px] md:!max-w-[320px] xl:!max-w-[360px] !p-3 md:!p-5',
                    icon: '!scale-50 md:!scale-75 xl:!scale-90 !m-0 !mx-auto',
                    title: '!text-sm md:!text-lg xl:!text-xl !font-bold !text-gray-800 !mt-1 !mb-0',
                    htmlContainer: '!text-xs md:!text-sm xl:!text-base !mt-1 !mb-1 !text-gray-500',
                }
            });
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    return (
        <button 
            onClick={dispararAlerta} 
            className="cursor-pointer inline-block bg-transparent border-none p-0 text-left focus:outline-none"
            aria-label="Copiar chave Pix"
        >
            {children}
        </button>
    );
}

export default Copiador;