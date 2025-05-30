
import fridgeLogo from "../assets/fridge_rescue.png";
import "../App.css";
import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeSearchResults from '../components/SearchResults';

import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import { findRecipesByIngredients, getRecipeInstructions }from '../api/recipesapi';

function Search() {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isIngredientsSubmitted, setIsIngredientsSubmitted] = useState(false);

  const [simplifiedRecipes, setSimplifiedRecipes] = useState([]); // Add state for simp

  //state for showing result on button press (trisha) -  to be updated after API integration
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (ingredients) => {
    try {
      //
      setIsIngredientsSubmitted(true);

      setLoading(true);
      setError(null);
      
      // update state for results module (trisha) - to be updated for API Integration
      setShowResults(true);

      /*fetch api and display results*/

      // const results = await findRecipesByIngredients(ingredients);
      // const receiptitem1 = await getRecipeInstructions(665734);

    } catch (err) {
      setIsIngredientsSubmitted(false);
      setError("Failed to fetch recipes. Please try again.");
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

      {/* Only show results after search button is pressed */}
      {showResults && (
        <div>
          <RecipeSearchResults />
        </div>
      )}

      

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Do the mock data when the user enter these 3 ingredients
      apples
      flour
      sugar */}

      {/* Try to do mock data first */}

    </div>
  );
}

export default Search;
