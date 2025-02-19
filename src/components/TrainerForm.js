import React, { useState, useEffect } from 'react';
import './TrainerForm.css';

const TrainerForm = () => {
  const [trainers, setTrainers] = useState([]);
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

  return (
    <div className="trainer-container">
      <h2>Register Pokemon Trainer</h2>
      <form className="trainer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Trainer Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter trainer's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="Enter trainer's region"
          />
        </div>

        <div className="form-group">
          <label htmlFor="favoritePokemon">Favorite Pokemon:</label>
          <input
            type="text"
            id="favoritePokemon"
            name="favoritePokemon"
            value={formData.favoritePokemon}
            onChange={handleInputChange}
            placeholder="Enter favorite Pokemon"
          />
        </div>

        <button type="submit" className="submit-button">Register Trainer</button>
      </form>

      <div className="trainers-list">
        {trainers.map(trainer => (
          <div key={trainer.id} className="trainer-card">
            <div className="trainer-info">
              <h4>{trainer.name}</h4>
              <p><strong>Region:</strong> {trainer.region}</p>
              <p><strong>Favorite Pokemon:</strong> {trainer.favoritePokemon}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(trainer.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerForm;