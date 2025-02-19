import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Pokédex de Agui</h1>
        <nav>
          <ul>
            <li>Inicio</li>
            <li>Buscar Pokémon</li>
            <li>Entrenadores</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;