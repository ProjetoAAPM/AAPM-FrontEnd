import { useState } from "react";

function Formulario({ tipo }) {
    const [usuario, setUsuario] = useState('aluno');
    const [dados, setDados] = useState({ senha:'', confirmar_senha:'', dur_curso:'', data_inicio:'', data_final: ''});

    const guardar = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    }

    const enviar = (e) => {
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
        <div className=" pt-32 pb-32">
            <form onSubmit={enviar} className="max-w-[1000px] w-full min-h-screen mx-auto p-10 bg-[#C83D3D] rounded-lg">
                <h2 className="text-4xl font-bold italic text-white">
                    {tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}
                </h2>

                {tipo !== 'login' && (
                    <div>
                        <label className="text-white font-bold">Nome:</label>
                        <input type="text" name="nome" onChange={guardar} />
                    </div>
                )}

                <div>
                    <label className="text-white font-bold">Email:</label>
                    <input type="email" name="email" onChange={guardar}/>
                </div>

                {tipo !== 'login' && (
                    <>
                        <div>
                            <label className="text-white font-bold">Você é?</label>
                            <div>
                                <button type="button" onClick={() => setUsuario('aluno')}>Aluno</button>
                                <button type="button" onClick={() => setUsuario('docente')}>Docente</button>
                            </div>
                        </div>

                        {usuario === 'aluno' ? (
                            <>
                                <div>
                                    <label className="text-white font-bold">Curso:</label>
                                    <input type="text" name="curso" onChange={guardar} />
                                </div> 

                                <div>
                                    <label className="text-white font-bold">Duração do Curso:</label>
                                    
                                    <div>
                                        <label className="text-white font-bold">Data Inicio</label>
                                        <input type="date" name="data_inicio" onChange={guardar} />
                                    </div>

                                    <div>
                                        <label className="text-white font-bold">Data Final</label>
                                        <input type="date" name="data_final" onChange={guardar} />
                                    </div>
                                </div> 
    
                            </>
                        ) : (
                            <div>
                                <label className="text-white font-bold">Especialidade:</label>
                                <input type="text" name="especialidade" onChange={guardar}/>
                            </div>
                        )}
                    </>
                )}

                <div>
                    <label className="text-white font-bold">Senha:</label>
                    <input type="password" name="senha" onChange={guardar}/>
                </div>

                {tipo !== 'login' && (
                    <div>
                        <label className="text-white font-bold">Confirmar Senha:</label>
                        <input type="password" name="confirmar_senha" onChange={guardar}/>
                    </div>
                )}

                <button type="submit">{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>
            </form>
        </div>
        
    )
}

export default Formulario;