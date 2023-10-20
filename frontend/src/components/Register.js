import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Register = () => {
    const [name, setName]         = useState("");    
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { 
            name,
            email,
            password 
        };

        const response = await api.post('/user/create', data);
        
        if (response.data.success) {
            alert("Conta criada com sucesso!");
			navigate("/");
        } else {
            alert("Não foi possível criar a conta");
        }
    };

    return (
        <main className='register'>
            <h1 className='registerTitle'>Criar conta</h1>
            <form className='registerForm' onSubmit={ handleSubmit }>
                <label htmlFor='username'>Nome</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />                
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
                
                <button className='registerBtn'>CADASTRAR</button>
                <p>
                    Já tem cadastro ? <Link to='/'>Clique aqui</Link>
                </p>
            </form>
        </main>
    );
};

export default Register;