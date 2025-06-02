import fridgeLogo from "../assets/fridge_rescue.png";
import "../App.css";
import { useState, createContext, useContext } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeSearchResults from '../components/SearchResults';
import { findRecipesByIngredients, findRecipesByIngredientsMock, getRecipeInstructions } from '../api/recipesapi';
import { useRecipeContext } from '../context/RecipeContext';

import { useLocation  } from "react-router-dom";
import { useEffect } from "react";

const SearchContext = createContext();

function Search() {

const location = useLocation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { searchResults, updateSearchResults } = useRecipeContext();

  // Add this useEffect to show results if context has data
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setShowResults(true);
    }
  }, [searchResults]);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      
      setShowResults(false);
      
      const results = await findRecipesByIngredients(ingredients);

      /* CALEB: TRISHA - What does this function do?? */
      updateSearchResults(results, ingredients);

      // Store results in state
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

//   useEffect(() => {
//   if (location.state?.searchState) {
//     // Restore your state here
//     setQuery(location.state.searchState.query);
//     // ...etc
//   }
// }, [location]);

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
      {/* )} */}

      {/* show recipe details in light windows after user click on it */}
      {showResults}

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
            <RecipeSearchResults recipes={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;