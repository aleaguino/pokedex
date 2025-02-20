import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pokedex.css';

const Pokedex = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pokemonPerPage = 20;

  const fetchPokemon = async (page) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pokemonPerPage;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`);
      const data = await response.json();
      
      setTotalPages(Math.ceil(data.count / pokemonPerPage));

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default,
            types: details.types.map(type => type.type.name)
          };
        })
      );

      setPokemon(pokemonDetails);
      setError(null);
    } catch (err) {
      setError('Error al cargar los Pokémon. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="pokedex-container loading">
        <div className="loading-spinner">Cargando Pokémon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokedex-container error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="pokedex-container">
      <h1>Pokédex Completa</h1>
      <div className="pokemon-grid">
        {pokemon.map((p) => (
          <div 
            key={p.id} 
            className="pokemon-card"
            onClick={() => navigate(`/pokemon/${p.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={p.image} alt={p.name} className="pokemon-image" />
            <h3>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
            <div className="pokemon-types">
              {p.types.map((type, index) => (
                <span key={index} className={`type ${type}`}>{type}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="loading-spinner">Cargando Pokémon...</div>
      )}
      <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Anterior
        </button>
        <span className="page-number">Página {currentPage} de {totalPages}</span>
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pokedex;