import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for the current Pokemon data
  const [pokemon, setPokemon] = useState(null);
  // State for the loading spinner
  const [loading, setLoading] = useState(true);
  // State for the user's search input
  const [searchQuery, setSearchQuery] = useState('');

  // The main function to talk to the PokeAPI
  const fetchPokemon = async (nameOrId) => {
    setLoading(true);
    try {
      // PokeAPI is case-sensitive for names, so we use .toLowerCase()
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    } catch (error) {
      alert("Pokemon not found! Please check the spelling or ID.");
      setLoading(false);
    }
  };

  // Helper to get a random Pokemon
  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    fetchPokemon(randomId.toString());
  };

  // Helper to handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchPokemon(searchQuery);
    }
  };

  // Milestone 1 & 2: Load a Pokemon when the app first starts
  useEffect(() => {
    fetchPokemon('1'); // Starting with Bulbasaur
  }, []);

  return (
    <div className="App">
      <h1>Pokédex</h1>

      {/* Search Bar Section */}
      <form onSubmit={handleSearch} className="search-container">
        <input 
          type="text" 
          placeholder="Enter Name or ID" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Random Button */}
      <button onClick={handleRandom} style={{ marginTop: '10px' }}>
        Get Random Pokemon
      </button>

      {/* Conditional Rendering: Show "Loading" or the Pokemon Card */}
      {loading ? (
        <div className="loading">
          <p>Searching the tall grass...</p>
        </div>
      ) : (
        pokemon && (
          <div className="poke-card">
            <div className="poke-id">#{pokemon.id}</div>
            <h2>{pokemon.name.toUpperCase()}</h2>
            
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={pokemon.name} 
              className="pokemon-image"
            />

            <div className="types">
              {pokemon.types.map((t) => (
                <span key={t.type.name} className="type-badge">
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="stats">
              <p><strong>Height:</strong> {pokemon.height / 10}m</p>
              <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;