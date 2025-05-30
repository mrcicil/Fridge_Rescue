import fridgeLogo from "../assets/fridge_rescue.png";
import "../App.css";
import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeSearchResults from '../components/SearchResults';
import { findRecipesByIngredients, getRecipeInstructions } from '../api/recipesapi';

function Search() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]); // Store the fetched recipes
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      setShowResults(false); // Hide previous results while loading
      
      // Fetch recipes from API
      const results = await findRecipesByIngredients(ingredients);
      
      // Store results in state
      setRecipes(results);
      
      // Show results
      setShowResults(true);
      
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setShowResults(false);
      console.error('Recipe search error:', err);
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

      {/* Loading state */}
      {loading && <div className="loading">Searching for recipes...</div>}
      
      {/* Error state */}
      {error && <div className="error">{error}</div>}

      {/* Only show results after successful search */}
      {showResults && !loading && (
        <div>
          <RecipeSearchResults recipes={recipes} />
        </div>
      )}
    </div>
  );
}

export default Search;