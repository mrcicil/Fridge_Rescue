import fridgeLogo from "../assets/fridge_rescue.png";
import "../App.css";
import { useState } from "react";
import IngredientInput from "../components/IngredientInput";

import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";

function Search() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isIngredientsSubmitted, setIsIngredientsSubmitted] = useState(false);

  const [simplifiedRecipes, setSimplifiedRecipes] = useState([]); // Add state for simp

  const handleSearch = async (ingredients) => {
    try {
      //
      setIsIngredientsSubmitted(true);

      setLoading(true);
      setError(null);
      /*fetch api and display results*/
      // Mocked data

      // Extract only id and title
      const simplifiedRecipes = recipe_detail.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
      }));

      setSimplifiedRecipes(simplifiedRecipes);

      console.log("simplifiedRecipes", simplifiedRecipes);
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

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Do the mock data when the user enter these 3 ingredients
      apples
      flour
      sugar */}

      {/* Try to do mock data first */}

      {isIngredientsSubmitted && (
        <>
          <h2>Recipes</h2>
          <ul>
            {simplifiedRecipes.map((recipe) => (
              <li key={recipe.id}>
                {/* {recipe.title} (ID: {recipe.id}) */}
                {recipe.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Search;
