import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import WordSearch from './components/WordSearch';
import TrainerForm from './components/TrainerForm';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <WordSearch />
        <TrainerForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
