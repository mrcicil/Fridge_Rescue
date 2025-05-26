import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import './App.css';
import fridgeLogo from './assets/fridge_rescue.png';

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      /*fetch api and display results*/
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="fridgeLogoimg">
        <img src={fridgeLogo} alt="Fridge Rescue" />
      </div>
      <p className="app-description">
        Reduce food waste by finding recipes with ingredients you already have!
      </p>
      
      <IngredientInput onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;