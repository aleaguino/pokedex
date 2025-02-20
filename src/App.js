import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WordSearch from './components/WordSearch';
import TrainerForm from './components/TrainerForm';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <WordSearch />
              <TrainerForm />
            </main>
          } />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
