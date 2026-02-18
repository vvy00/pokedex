import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch a random Pokemon
  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      // Pick a random ID between 1 and 1025
      const randomId = Math.floor(Math.random() * 1025) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      
      setPokemon(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setLoading(false);
    }
  };

  // Run this once when the page first loads
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div className="App">
      <h1>My Pokedex</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="poke-card">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} 
          />
          <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <button onClick={fetchRandomPokemon}>Get Random Pokemon</button>
        </div>
      )}
    </div>
  );
}

export default App;