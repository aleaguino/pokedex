import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Pokédex de Agui. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokeAPI</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Uso</a>
        </div>
        <div className="pokemon-info">
          <p>Powered by la tecnología de los Pokémon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;