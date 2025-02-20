import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await pokemonResponse.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        // Process evolution chain
        const processEvolutionChain = (chain) => {
          const result = [];
          let current = chain;

          while (current) {
            result.push({
              name: current.species.name,
              min_level: current.evolution_details[0]?.min_level || null
            });
            current = current.evolves_to[0];
          }
          return result;
        };

        setPokemon({
          id: pokemonData.id,
          name: pokemonData.name,
          height: pokemonData.height / 10,
          weight: pokemonData.weight / 10,
          types: pokemonData.types.map(type => type.type.name),
          abilities: pokemonData.abilities.map(ability => ({
            name: ability.ability.name,
            is_hidden: ability.is_hidden
          })),
          stats: pokemonData.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          moves: pokemonData.moves.slice(0, 10).map(move => move.move.name),
          sprites: {
            front: pokemonData.sprites.other['official-artwork'].front_default,
            back: pokemonData.sprites.back_default,
            shiny: pokemonData.sprites.front_shiny
          },
          description: speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'es'
          )?.flavor_text || 'No hay descripción disponible.'
        });

        setEvolution(processEvolutionChain(evolutionData.chain));
        setError(null);
      } catch (err) {
        setError('Error al cargar los detalles del Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="pokemon-detail-container loading">
        <div className="loading-spinner">Cargando detalles del Pokémon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail-container error">
        <div className="error-message">{error}</div>
        <Link to="/pokedex" className="back-button">Volver a la Pokédex</Link>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="pokemon-detail-container">
      <Link to="/pokedex" className="back-button">Volver a la Pokédex</Link>
      
      <div className="pokemon-header">
        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
      </div>

      <div className="pokemon-images">
        <img src={pokemon.sprites.front} alt={pokemon.name} className="main-image" />
        <div className="alternate-sprites">
          {pokemon.sprites.back && (
            <img src={pokemon.sprites.back} alt={`${pokemon.name} back view`} />
          )}
          {pokemon.sprites.shiny && (
            <img src={pokemon.sprites.shiny} alt={`${pokemon.name} shiny`} />
          )}
        </div>
      </div>

      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type ${type}`}>{type}</span>
        ))}
      </div>

      <div className="pokemon-description">
        <p>{pokemon.description}</p>
      </div>

      <div className="pokemon-info-grid">
        <div className="info-section">
          <h2>Características</h2>
          <p>Altura: {pokemon.height} m</p>
          <p>Peso: {pokemon.weight} kg</p>
        </div>

        <div className="info-section">
          <h2>Habilidades</h2>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>
                {ability.name}
                {ability.is_hidden && <span className="hidden-ability">(Oculta)</span>}
              </li>
            ))}
          </ul>
        </div>


        <div className="info-section">
          <h2>Movimientos</h2>
          <div className="moves-grid">
            {pokemon.moves.map((move, index) => (
              <span key={index} className="move">{move}</span>
            ))}
          </div>
        </div>

        {evolution && evolution.length > 1 && (
          <div className="info-section evolution">
            <h2>Cadena Evolutiva</h2>
            <div className="evolution-chain">
              {evolution.map((evo, index) => (
                <React.Fragment key={index}>
                  <div className="evolution-stage">
                    <span className="pokemon-name">{evo.name}</span>
                    {evo.min_level && (
                      <span className="evolution-level">Nivel {evo.min_level}</span>
                    )}
                  </div>
                  {index < evolution.length - 1 && (
                    <span className="evolution-arrow">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;