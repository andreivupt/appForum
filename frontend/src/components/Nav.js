import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const signOut = () => {
        alert("Usuário deslogando!");
        localStorage.removeItem("@auth:token");
        navigate("/");
    };

    const home = () => {
        navigate("/dashboard");
    }
    
    return (
        <nav className='navbar'>
            <h2>
                <span onClick={ home }>Fórum</span>
            </h2>
            <div className='navbarRight'>
                <button onClick={ signOut }>Sair</button>
            </div>
        </nav>
    );
};

export default Nav;