import React, { useState } from 'react';
import './WordSearch.css';

const WordSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPokemon = async () => {
    if (!pokemonName.trim()) return;

    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error('Pokemon not found');
      }

      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="word-search-container">
      <h2>Pokemon Search</h2>
      <div className="search-form">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon name"
          className="search-input"
        />
        <button
          onClick={searchPokemon}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          <div className="pokemon-types">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`type ${type}`}>{type}</span>
            ))}
          </div>
          <div className="pokemon-stats">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-name">{stat.name}:</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;