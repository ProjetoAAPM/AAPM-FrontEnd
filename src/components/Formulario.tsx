import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Formulario({ tipo } : any) {
    const [usuario, setUsuario] = useState('aluno');
    const [dados, setDados] = useState({ senha:'', confirmar_senha:'', dur_curso:'', data_inicio:'', data_final: ''});

    const navigate = useNavigate();

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

        if (tipo === 'cadastro') {
            navigate('/escolhaplano');
        } else {
            navigate('/home');
        }
    }

    const cores = {
        aluno: { bg: 'bg-[#C83D3D]', bg_label: 'bg-[#902C2D]', btn: 'bg-[#383636]', titulo: 'text-[#FFFFFF]' },
        docente: { bg: 'bg-[#86D5FE]', bg_label: 'bg-[#2C6090]', btn: 'bg-[#383636]', titulo: 'text-[#16334D]' },
        login: { bg: 'bg-[#FFEFAF]', bg_label: 'bg-[#FFDB4B]', btn: 'bg-[#FFDB4B]', titulo: 'text-[#101625]' }
    };

    const tema = tipo === 'login' ? cores.login : (usuario === 'aluno' ? cores.aluno : cores.docente);

    const estiloLabel = `${tema.bg_label} w-fit py-2 px-14 rounded-r-full mb-2 text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${tipo === 'login' ? ' text-[#373737] font-bold' : 'pl-20  -ml-18.5 text-[#FFFFFF] font-semibold' }`;

    const estiloInput = `h-[40px] p-1 bg-white rounded-md ${tipo === 'login' ? 'w-[380px] mx-15 shadow-md' : 'mx-2 shadow-md'}`;

    return (
        <div className="w-full flex justify-center py-20">
            <form onSubmit={enviar} className={`${tema.bg} ${tipo === 'login' ? 'min-h-[500px] w-[500px] mt-35' : 'max-w-[848px] w-full mt-20 mb-20'}  py-10 rounded-xl flex flex-col items-center gap-6`}>
                <img src="src/assets/icons/Logo48.svg" alt="logo" className={`${tipo === 'login' ? 'top-[170px]' : 'top-[110px]'} absolute h-[100px] w-auto drop-shadow-md`}/>
                <h2 className={`text-4xl font-bold italic mt-4 ${tema.titulo}`}>
                    {tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8">
                    {tipo !== 'login' && (
                        <div className="flex flex-col w-full">
                            <label className={estiloLabel}>Nome:</label>
                            <input type="text" name="nome" onChange={guardar} className={estiloInput} />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className={estiloLabel}>E-mail:</label>
                        <input type="email" name="email" onChange={guardar} className={estiloInput}/>
                    </div>

                    {tipo !== 'login' && (
                        <>
                            <div className="flex flex-col">
                                <label className={estiloLabel}>Você é?</label>
                                <div className="grid grid-cols-5 gap-6">
                                    <button type="button" onClick={() => setUsuario('aluno')} className={`w-[130px] h-[45px] rounded-xl text-lg font-bold shadow-sm cursor-pointer ${usuario === 'aluno' ? 'bg-[#383636] text-white ' : 'bg-[#DDDDDD] text-black'}`}>Aluno</button>
                                    <button type="button" onClick={() => setUsuario('docente')} className={`w-[130px] h-[45px] rounded-xl text-lg font-bold shadow-sm cursor-pointer ${usuario === 'docente' ? 'bg-[#383636] text-white ' : 'bg-[#DDDDDD] text-black'}`}>Docente</button>
                                </div>
                            </div>

                            {usuario === 'aluno' ? (
                                <>
                                    <div className="flex flex-col">
                                        <label className={estiloLabel}>Curso:</label>
                                        <input type="text" name="curso" onChange={guardar} className={estiloInput}/>
                                    </div> 

                                    <div className=" flex flex-col">
                                        <label className={estiloLabel}>Duração do Curso:</label>
                                        
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Inicio</label>
                                                <input type="date" name="data_inicio" onChange={guardar} className={estiloInput}/>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Final</label>
                                                <input type="date" name="data_final" onChange={guardar} className={estiloInput}/>
                                            </div>
                                        </div>
                                    </div> 
        
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    <label className={estiloLabel}>Especialidade:</label>
                                    <input type="text" name="especialidade" onChange={guardar} className={estiloInput}/>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col">
                        <label className={estiloLabel}>Senha:</label>
                        <input type="password" name="senha" onChange={guardar} className={estiloInput}/>
                    </div>

                    {tipo !== 'login' && (
                        <div className="flex flex-col">
                            <label className={estiloLabel}>Confirmar Senha:</label>
                            <input type="password" name="confirmar_senha" onChange={guardar} className={estiloInput}/>
                        </div>
                    )}

                    <div className="flex justify-center mt-4">
                        <button type="submit" className={`${tema.btn} ${tipo === 'login' ? 'w-[170px] h-[50px] rounded-full text-[#373737]' : 'w-[170px] h-[50px] rounded-2xl text-[#FFFFFF]'} text-xl font-bold shadow-md cursor-pointer`} >{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>
                    </div>

                </div>
            </form>
        </div>
        
    )
}

export default Formulario;