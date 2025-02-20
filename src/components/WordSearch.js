import React, { useState } from 'react';
import './WordSearch.css';

const WordSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemonById = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) return null;
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };
    } catch (err) {
      return null;
    }
  };

  const searchPokemon = async () => {
    if (!pokemonName.trim()) return;

    setLoading(true);
    setError(null);
    setPokemon(null);
    setPrevPokemon(null);
    setNextPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }

      const data = await response.json();
      const currentId = data.id;

      const [prev, current, next] = await Promise.all([
        currentId > 1 ? fetchPokemonById(currentId - 1) : null,
        fetchPokemonById(currentId),
        fetchPokemonById(currentId + 1)
      ]);

      setPrevPokemon(prev);
      setPokemon(current);
      setNextPokemon(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PokemonCard = ({ pokemon, type }) => {
    if (!pokemon) return null;
    return (
      <div className={`pokemon-card ${type}`}>
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type ${type}`}>{type}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="word-search-container">
      <h2>Buscar Pokémon</h2>
      <div className="search-form">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Ingresa el nombre del Pokémon"
          className="search-input"
        />
        <button
          onClick={searchPokemon}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {pokemon && (
        <>
          <div className="pokemon-cards-container">
            <button
              onClick={() => {
                if (prevPokemon) {
                  setNextPokemon(pokemon);
                  setPokemon(prevPokemon);
                  fetchPokemonById(prevPokemon.id - 1).then(setPrevPokemon);
                }
              }}
              disabled={!prevPokemon}
              className="nav-button"
            >
              ←
            </button>
            <PokemonCard pokemon={prevPokemon} type="previous" />
            <PokemonCard pokemon={pokemon} type="current" />
            <PokemonCard pokemon={nextPokemon} type="next" />
            <button
              onClick={() => {
                if (nextPokemon) {
                  setPrevPokemon(pokemon);
                  setPokemon(nextPokemon);
                  fetchPokemonById(nextPokemon.id + 1).then(setNextPokemon);
                }
              }}
              disabled={!nextPokemon}
              className="nav-button"
            >
              →
            </button>
          </div>

          <div className="region-index">
            <h3>Regiones Pokémon</h3>
            <div className="region-list">
              <div className="region-item">
                <h4>Kanto</h4>
                <p>Pokémon #001 - #151</p>
              </div>
              <div className="region-item">
                <h4>Johto</h4>
                <p>Pokémon #152 - #251</p>
              </div>
              <div className="region-item">
                <h4>Hoenn</h4>
                <p>Pokémon #252 - #386</p>
              </div>
              <div className="region-item">
                <h4>Sinnoh</h4>
                <p>Pokémon #387 - #493</p>
              </div>
              <div className="region-item">
                <h4>Unova</h4>
                <p>Pokémon #494 - #649</p>
              </div>
              <div className="region-item">
                <h4>Kalos</h4>
                <p>Pokémon #650 - #721</p>
              </div>
              <div className="region-item">
                <h4>Alola</h4>
                <p>Pokémon #722 - #809</p>
              </div>
              <div className="region-item">
                <h4>Galar</h4>
                <p>Pokémon #810 - #898</p>
              </div>
              <div className="region-item">
                <h4>Paldea</h4>
                <p>Pokémon #906 - #1008</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WordSearch;