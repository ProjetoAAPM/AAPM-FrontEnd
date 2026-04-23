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
        <form onSubmit={enviar}>
            <h2>{tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}</h2>

            {tipo !== 'login' && (
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" onChange={guardar} />
                </div>
            )}

            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={guardar}/>
            </div>

            {tipo !== 'login' && (
                <>
                    <div>
                        <label>Você é?</label>
                        <div>
                            <button type="button" onClick={() => setUsuario('aluno')}>Aluno</button>
                            <button type="button" onClick={() => setUsuario('docente')}>Docente</button>
                        </div>
                    </div>

                    {usuario === 'aluno' ? (
                        <>
                            <div>
                                <label>Curso:</label>
                                <input type="text" name="curso" onChange={guardar} />
                            </div> 

                            <div>
                                <label>Duração do Curso:</label>
                                
                                <div>
                                    <label>Data Inicio</label>
                                    <input type="date" name="data_inicio" onChange={guardar} />
                                </div>

                                <div>
                                    <label>Data Final</label>
                                    <input type="date" name="data_final" onChange={guardar} />
                                </div>
                            </div> 
 
                        </>
                    ) : (
                        <div>
                            <label>Especialidade:</label>
                            <input type="text" name="especialidade" onChange={guardar}/>
                        </div>
                    )}
                </>
            )}

            <div>
                <label>Senha:</label>
                <input type="password" name="senha" onChange={guardar}/>
            </div>

            {tipo !== 'login' && (
                <div>
                    <label>Confirmar Senha:</label>
                    <input type="password" name="confirmar_senha" onChange={guardar}/>
                </div>
            )}

            <button type="submit">{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>
        </form>
    )
}

export default Formulario;