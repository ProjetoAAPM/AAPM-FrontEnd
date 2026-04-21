import Swal from 'sweetalert2';

function Copiador({ children, textoParaCopiar } : any) {
    
    const dispararAlerta = () => {
        navigator.clipboard.writeText(textoParaCopiar);
        
        Swal.fire({
            title: 'Copiado!',
            text: 'Chave Pix copiada com sucesso.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            width: '360px',
            customClass: {
                popup: '!rounded-[30px] !border-2 !border-[#7ed957] !shadow-2xl !bg-white',
                title: '!text-lg !font-bold !text-gray-800',
                icon: '!scale-75'
            }
        });
    };

    return (
        <div onClick={dispararAlerta} className="cursor-pointer inline-block">
            {children}
        </div>
    );
}

export default Copiador;