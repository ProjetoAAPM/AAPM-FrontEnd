import { useState } from "react";

function Formulario({ tipo } : any) {
    const [usuario, setUsuario] = useState('aluno');
    const [dados, setDados] = useState({ senha:'', confirmar_senha:'', dur_curso:'', data_inicio:'', data_final: ''});

    const guardar = (e : any) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    }

    const enviar = (e : any) => {
        e.preventDefault();

        if (tipo !== 'login' && dados.senha !== dados.confirmar_senha) {
            alert("Senhas diferentes!");
            return;
        }

        let dadosFinalizados = { ...dados };
        if (usuario === 'aluno') {
            dadosFinalizados.dur_curso = `${dados.data_inicio} até ${dados.data_final}`;

            delete dadosFinalizados.data_inicio;
            delete dadosFinalizados.data_final;
        }
        delete dadosFinalizados.confirmar_senha;

        console.log("Enviando:", dadosFinalizados);
    }

    return (
        <div className="w-full flex justify-center py-20">
            <form onSubmit={enviar} className="max-w-[848px] w-full min-h-screen mx-auto py-10 bg-[#C83D3D] rounded-lg flex flex-col items-center gap-6">
                <img src="src/assets/icons/Logo48.svg" alt="logo" className="absolute top-[30px] h-[100px] w-auto drop-shadow-md"/>
                <h2 className="text-4xl font-bold italic text-white mt-6">
                    {tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8">
                    {tipo !== 'login' && (
                        <div className="flex flex-col w-full">
                            <label className="bg-[#902C2D] w-fit py-2 px-14 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold ">Nome:</label>
                            <input type="text" name="nome" onChange={guardar} className="w-full h-[40px] p-1 bg-white rounded-md shadow-md" />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Email:</label>
                        <input type="email" name="email" onChange={guardar} className="w-full h-[40px] p-1 bg-white rounded-md shadow-md"/>
                    </div>

                    {tipo !== 'login' && (
                        <>
                            <div className="flex flex-col">
                                <label className="bg-[#902C2D] w-fit py-2 px-12 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Você é?</label>
                                <div className="grid grid-cols-5 gap-6">
                                    <button type="button" onClick={() => setUsuario('aluno')} className="w-[130px] h-[45px] bg-[#383636] rounded-xl text-white text-lg font-bold shadow-sm cursor-pointer">Aluno</button>
                                    <button type="button" onClick={() => setUsuario('docente')} className="w-[130px] h-[45px] bg-[#DDDDDD] rounded-xl text-black text-lg font-bold shadow-sm cursor-pointer">Docente</button>
                                </div>
                            </div>

                            {usuario === 'aluno' ? (
                                <>
                                    <div className="flex flex-col">
                                        <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Curso:</label>
                                        <input type="text" name="curso" onChange={guardar} className="w-full h-[40px] p-1 bg-white rounded-md shadow-md"/>
                                    </div> 

                                    <div className=" flex flex-col">
                                        <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Duração do Curso:</label>
                                        
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Inicio</label>
                                                <input type="date" name="data_inicio" onChange={guardar} className="w-full h-[40px] p-4 bg-white rounded-md shadow-sm"/>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Final</label>
                                                <input type="date" name="data_final" onChange={guardar} className="w-full h-[40px] p-4 bg-white rounded-md shadow-sm"/>
                                            </div>
                                        </div>
                                    </div> 
        
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Especialidade:</label>
                                    <input type="text" name="especialidade" onChange={guardar} className="w-full h-[40px] p-1 bg-white rounded-md shadow-md"/>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col">
                        <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Senha:</label>
                        <input type="password" name="senha" onChange={guardar} className="w-full h-[40px] bg-white rounded-md shadow-md"/>
                    </div>

                    {tipo !== 'login' && (
                        <div className="flex flex-col">
                            <label className="bg-[#902C2D] w-fit py-2 px-15 pl-20 -ml-18.5 rounded-r-full mb-2 text-white text-lg font-semibold">Confirmar Senha:</label>
                            <input type="password" name="confirmar_senha" onChange={guardar} className="w-full h-[40px] bg-white rounded-md shadow-md"/>
                        </div>
                    )}

                    <div className="flex justify-center mt-4">
                        <button type="submit" className="w-[170px] h-[50px] bg-[#383636] rounded-2xl text-white text-xl font-bold shadow-md cursor-pointer" >{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>
                    </div>

                </div>
            </form>
        </div>
        
    )
}

export default Formulario;