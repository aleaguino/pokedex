import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Pokédex de Agui</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/">Buscar Pokémon</Link></li>
            <li><Link to="/">Entrenadores</Link></li>
            <li><Link to="/pokedex">Pokédex</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;