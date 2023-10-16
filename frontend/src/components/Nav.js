import React from "react";

const Nav = () => {
    const signOut = () => {
        alert("User signed out!");
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