import React, {createContext, useContext, useState } from "react";

const RecipeContext = createContext();

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    return context;
};

export const RecipeProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to store search results
  const updateSearchResults = (recipes, ingredients) => {
    setSearchResults(recipes);
    setSearchIngredients(ingredients);
  };

  // Function to select a recipe for viewing
  const selectRecipe = (recipeId) => {
    const recipe = searchResults.find(r => r.id === recipeId);
    setSelectedRecipe(recipe);
  };

  const value = {
    // States
    searchResults,
    searchIngredients,
    selectedRecipe,
    
    // Actions
    updateSearchResults,
    selectRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};