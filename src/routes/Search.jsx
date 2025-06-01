import fridgeLogo from "../assets/fridge_rescue.png";
import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeSearchResults from '../components/SearchResults';
import { findRecipesByIngredients } from '../api/recipesapi';

function Search() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      setShowResults(false);
      
      const results = await findRecipesByIngredients(ingredients);
      setRecipes(results);
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
    <div className="max-w-7xl mx-auto px-5 min-h-screen bg-recipe-50">
      {/* Hero Section */}
      <div className="pt-16 pb-8">
        <div className="text-center mb-8">
          <img
            src={fridgeLogo}
            alt="Fridge Rescue"
            className="w-32 h-auto mx-auto mb-6 animate-float"
          />
          <p className="text-xl text-recipe-700 max-w-2xl mx-auto">
            Reduce food waste by finding recipes with ingredients you already have!
          </p>
        </div>

        <IngredientInput onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-lg text-recipe-600">
              Searching for recipes...
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="mx-auto max-w-2xl mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Results */}
        {showResults && !loading && (
          <div className="mt-8">
            <RecipeSearchResults recipes={recipes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;