import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        const response = await api.post('/auth/login', data);
        
        if (response.data.success && response.data.data.status === 'A') {
			navigate("/dashboard");

            localStorage.setItem('@auth:user', response.data.data.id);
            localStorage.setItem('@auth:token', response.data.data.token);
        } else {
            alert("Não foi possível criar a conta");
        }
    };

    return (
        <main className='login'>
            <h1 className='loginTitle'>Acesse a sua conta</h1>
            <form className='loginForm' onSubmit = { handleSubmit }>
                <label htmlFor='email'>E-mail</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Senha</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>ENTRAR</button>
                <p>
                    Ainda não tem cadastro? <Link to='/register'>Clique aqui</Link>
                </p>
            </form>
        </main>
    );
};

export default Login;