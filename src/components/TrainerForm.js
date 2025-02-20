import React, { useState, useEffect } from 'react';
import './TrainerForm.css';

const TrainerForm = () => {
  const [trainers, setTrainers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    favoritePokemon: ''
  });

  useEffect(() => {
    const savedTrainers = localStorage.getItem('pokemon-trainers');
    if (savedTrainers) {
      setTrainers(JSON.parse(savedTrainers));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.region || !formData.favoritePokemon) return;

    const newTrainer = {
      id: Date.now(),
      ...formData
    };

    const updatedTrainers = [...trainers, newTrainer];
    setTrainers(updatedTrainers);
    localStorage.setItem('pokemon-trainers', JSON.stringify(updatedTrainers));

    setFormData({
      name: '',
      region: '',
      favoritePokemon: ''
    });
  };

  const handleDelete = (id) => {
    const updatedTrainers = trainers.filter(trainer => trainer.id !== id);
    setTrainers(updatedTrainers);
    localStorage.setItem('pokemon-trainers', JSON.stringify(updatedTrainers));
  };

  const toggleTrainersList = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="trainer-container">
      <h2>Registrar Entrenador Pokémon</h2>
      <form className="trainer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del Entrenador:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingresa el nombre del entrenador"
          />
        </div>

        <div className="form-group">
          <label htmlFor="region">Región:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="Ingresa la región"
          />
        </div>

        <div className="form-group">
          <label htmlFor="favoritePokemon">Pokémon Favorito:</label>
          <input
            type="text"
            id="favoritePokemon"
            name="favoritePokemon"
            value={formData.favoritePokemon}
            onChange={handleInputChange}
            placeholder="Ingresa tu Pokémon favorito"
          />
        </div>

        <button type="submit" className="submit-button">Registrar Entrenador</button>
      </form>

      <button 
        className={`trainers-toggle ${isExpanded ? 'expanded' : ''}`}
        onClick={toggleTrainersList}
      >
        Entrenadores Registrados
      </button>

      <div className={`trainers-list ${isExpanded ? 'expanded' : ''}`}>
        {trainers.map(trainer => (
          <div key={trainer.id} className="trainer-card">
            <div className="trainer-info">
              <h4>{trainer.name}</h4>
              <p>Región: {trainer.region}</p>
              <p>Pokémon Favorito: {trainer.favoritePokemon}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(trainer.id)}
            >
              Eliminar Entrenador
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerForm;