import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const signOut = () => {
        alert("Usuário deslogando!");
        localStorage.removeItem("_token");
        navigate("/");
    };
    
    return (
        <nav className='navbar'>
            <h2>Fórum</h2>
            <div className='navbarRight'>
                <button onClick={ signOut }>Sair</button>
            </div>
        </nav>
    );
};

export default Nav;