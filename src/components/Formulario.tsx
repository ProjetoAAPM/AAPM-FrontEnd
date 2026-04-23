import { useState } from "react";

function Formulario({ tipo }) {
    const [usuario, setUsuario] = useState('aluno');

    return (
        <form>
            <h2>{tipo === 'login' ? 'Faça seu Login' : 'Faça seu Cadastro'}</h2>

            {tipo !== 'login' && (
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" />
                </div>
            )}

            <div>
                <label>Email:</label>
                <input type="email" name="email"/>
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
                                <input type="text" name="curso" />
                            </div> 

                            <div>
                                <label>Duração do Curso:</label>
                                
                                <div>
                                    <label>Data Inicio</label>
                                    <input type="date" name="data_inicio" />
                                </div>

                                <div>
                                    <label>Data Final</label>
                                    <input type="date" name="data_final" />
                                </div>
                            </div> 
 
                        </>
                    ) : (
                        <div>
                            <label>Especialidade:</label>
                            <input type="text" name="especialidade" />
                        </div>
                    )}
                </>
            )}

            <div>
                <label>Senha:</label>
                <input type="password" name="senha" />
            </div>

            {tipo !== 'login' && (
                <div>
                    <label>Confirmar Senha:</label>
                    <input type="password" name="confirmar_senha" />
                </div>
            )}

            <button type="submit">{tipo === 'login' ? 'Entrar' : 'Cadastrar-se'}</button>
        </form>
    )
}

export default Formulario;