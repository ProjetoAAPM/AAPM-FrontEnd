import { useState} from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, SyntheticEvent } from 'react';

function Formulario({ tipo } : any) {

    const [dados, setDados] = useState({ nome: '', email: '', senha: '', confirmar_senha: '', curso: '', especialidade: '', data_inicio: '', data_final: '', tipo_usuario: 'aluno'});

    const navigate = useNavigate();

    const guardar = (e : ChangeEvent<HTMLInputElement>) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    }

    const alternarUsuario = (selecao: 'aluno' | 'docente') => {
        setDados({ ...dados, tipo_usuario: selecao})
    }

    const enviar = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (tipo !== 'login' && dados.senha !== dados.confirmar_senha) {
            alert("Senhas diferentes!");
            return;
        }

        if (dados.tipo_usuario === 'aluno' && !dados.curso) {
            alert("Informe o seu curso!")
            return;
        }

        if (dados.tipo_usuario === 'docente' && !dados.especialidade) {
            alert("Informe sua especialidade!")
            return;
        }
            
        navigate(tipo === 'cadastro' ? '/escolhaplano' : '/home');
    };

    const loginGoogle = () => {
        window.location.href = "http://localhost:5000/login/google";
    };

    const cores = {
        aluno: { bg: 'bg-[#C83D3D]', bg_label: 'bg-[#902C2D]', btn: 'bg-[#383636]', titulo: 'text-[#FFFFFF]' },
        docente: { bg: 'bg-[#86D5FE]', bg_label: 'bg-[#2C6090]', btn: 'bg-[#383636]', titulo: 'text-[#16334D]' },
        login: { bg: 'bg-[#FFEFAF]', bg_label: 'bg-[#FFDB4B]', btn: 'bg-[#FFDB4B]', titulo: 'text-[#101625]' }
    };

    const tema = tipo === 'login' ? cores.login : (dados.tipo_usuario === 'aluno' ? cores.aluno : cores.docente);

    const estiloLabel = `${tema.bg_label} w-fit py-2 px-14 rounded-r-full mb-2 text-lg inset-shadow-sm inset-shadow-indigo-700/10 ${tipo === 'login' ? ' text-[#373737] font-bold' : 'pl-20  -ml-18.5 text-[#FFFFFF] font-semibold' }`;

    const estiloInput = `h-[40px] p-3 bg-white rounded-md ${tipo === 'login' ? 'w-[380px] mx-15 shadow-md' : 'mx-2 shadow-md'}`;

    return (
        <div className="w-full flex justify-center py-20">
            <form onSubmit={enviar} className={`${tema.bg} ${tipo === 'login' ? 'min-h-[500px] w-[500px] mt-35' : 'max-w-[848px] w-full mt-20'} py-10 rounded-xl flex flex-col items-center gap-6 relative`}>
                <img src="src/assets/icons/Logo48.svg" alt="logo" className={`${tipo === 'login' ? '-top-[50px]' : '-top-[50px]'} absolute h-[100px] w-auto drop-shadow-md`}/>
                <h2 className={`text-4xl font-bold italic mt-4 ${tema.titulo}`}>
                    {tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}
                </h2>

                <div className="w-full max-w-[700px] flex flex-col gap-8">
                    {tipo !== 'login' && (
                        <div className="flex flex-col w-full">
                            <label className={estiloLabel}>Nome:</label>
                            <input type="text" name="nome" value={dados.nome} onChange={guardar} className={estiloInput} required/>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className={estiloLabel}>E-mail:</label>
                        <input type="email" name="email" value={dados.email} onChange={guardar} className={estiloInput} required/>
                    </div>

                    {tipo !== 'login' && (
                        <>
                            <div className="flex flex-col">
                                <label className={estiloLabel}>Você é?</label>
                                <div className="grid grid-cols-5 gap-6">
                                    <button 
                                        type="button" 
                                        onClick={() => alternarUsuario('aluno')} 
                                        className={`
                                            w-[130px] h-[45px] rounded-xl text-lg font-bold shadow-sm cursor-pointer
                                            ${dados.tipo_usuario === 'aluno' 
                                                ? 'bg-[#383636] text-white ' 
                                                : 'bg-[#DDDDDD] text-black'}`}
                                    >
                                        Aluno
                                    </button>

                                    <button 
                                        type="button" 
                                        onClick={() => alternarUsuario('docente')} 
                                        className={`
                                            w-[130px] h-[45px] rounded-xl text-lg font-bold shadow-sm cursor-pointer 
                                            ${dados.tipo_usuario === 'docente' 
                                                ? 'bg-[#383636] text-white ' 
                                                : 'bg-[#DDDDDD] text-black'}`}
                                    >
                                        Docente
                                    </button>
                                </div>
                            </div>

                            {dados.tipo_usuario === 'aluno' ? (
                                <>
                                    <div className="flex flex-col">
                                        <label className={estiloLabel}>Curso:</label>
                                        <input type="text" name="curso" value={dados.curso} onChange={guardar} className={estiloInput} required/>
                                    </div> 

                                    <div className=" flex flex-col">
                                        <label className={estiloLabel}>Duração do Curso:</label>
                                        
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Inicio</label>
                                                <input 
                                                    type="date" 
                                                    name="data_inicio"
                                                    value={dados.data_inicio}
                                                    onChange={guardar}
                                                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                                                    onFocus={(e) => (e.target.style.color = 'black')}
                                                    onBlur={(e) => (e.target.style.color = e.target.value ? 'black' : 'transparent')}
                                                    style={{ color: dados.data_inicio ? 'black' : 'transparent' }}
                                                    className={`${estiloInput} pl-3 pr-3 cursor-pointer`}
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-white text-lg text-center font-semibold mb-2">Data Final</label>
                                                <input 
                                                    type="date" 
                                                    name="data_final"
                                                    value={dados.data_final} 
                                                    onChange={guardar}
                                                    onFocus={(e) => (e.target.style.color = 'black')}
                                                    onBlur={(e) => (e.target.style.color = e.target.value ? 'black' : 'transparent')}
                                                    style={{ color: dados.data_final ? 'black' : 'transparent' }}
                                                    className={`${estiloInput} pl-3 pr-3 cursor-pointer`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div> 
        
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    <label className={estiloLabel}>Especialidade:</label>
                                    <input type="text" name="especialidade" value={dados.especialidade} onChange={guardar} className={estiloInput} required/>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col">
                        <label className={estiloLabel}>Senha:</label>
                        <input type="password" name="senha" value={dados.senha} onChange={guardar} className={estiloInput} required/>
                    </div>

                    {tipo === 'login' && (
                        <div className="w-full flex justify-start pl-15 -mt-3">
                            <a 
                                href="https://pess.sesisenaispedu.org.br/Portal.aspx"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#101625] text-sm font-semibold underline underline-offset-4 cursor-pointer"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>
                    )}

                    {tipo !== 'login' && (
                        <div className="flex flex-col">
                            <label className={estiloLabel}>Confirmar Senha:</label>
                            <input type="password" name="confirmar_senha" value={dados.confirmar_senha} onChange={guardar} className={estiloInput} required/>
                        </div>
                    )}

                    <div className="flex justify-center mt-4 gap-6">
                        <button type="submit" className={`${tema.btn} ${tipo === 'login' ? 'w-[170px] h-[50px] rounded-full text-[#373737]' : 'w-[170px] h-[50px] rounded-2xl text-[#FFFFFF]'} text-xl font-bold shadow-md cursor-pointer`} >{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>

                        {tipo === 'login' && (
                            <>
                                <button
                                    type="button"
                                    onClick={loginGoogle}
                                    className="w-[170px] h-[50px] bg-white border border-gray-300 rounded-full flex items-center justify-center gap-3 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 cursor-pointer transition-all"
                                >
                                    <img 
                                        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
                                        alt="Google" 
                                        className="w-6 h-6"
                                    />
                                   
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </div>
        
    )
}

export default Formulario;