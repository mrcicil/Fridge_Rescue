import React from 'react';
import { useNavigate } from 'react-router-dom';
//import styles from './SearchResults.module.css';
import { useRecipeContext } from '../context/RecipeContext';


const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { selectRecipe } = useRecipeContext();

  const handleCardClick = () => {
    // Store the selected recipe in context
    selectRecipe(recipe.id);

    navigate(`/recipe/${recipe.id}`, {
      state: {
        recipeData: recipe, // Pass the entire recipe object
      },
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 
             hover:shadow-xl hover:transform hover:scale-105 cursor-pointer 
             flex flex-col h-full w-full"
      onClick={handleCardClick}
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {/* Like button functionality to be added later */}
        {/* <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2 flex items-center space-x-1">
          <span className="text-red-500">❤️</span>
        </div> */}
      </div>

      {/* Recipe Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {recipe.title}
        </h3>

        {/* Ingredient Stats */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <span className="mr-1">✓</span>
            {recipe.usedIngredientCount} have
          </div>
          <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            <span className="mr-1">+</span>
            {recipe.missedIngredientCount} need
          </div>
        </div>

        {/* Missing Ingredients Preview */}
        {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold text-gray-700">Missing ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.slice(0, 3).map((ingredient, index) => (
                <span
                  key={ingredient.id}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {ingredient.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                  +{recipe.missedIngredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Visual indicator that it's clickable */}
        <div className="mt-4 text-center mt-auto pt-4">
          <button
            onClick={handleCardClick}
            className="inline-block bg-gray-600 dark:bg-gray-600 
                     !text-white px-4 py-2 rounded-lg font-semibold 
                     transition-all duration-300 
                     hover:bg-gray-700 dark:hover:bg-gray-700 
                     hover:-translate-y-0.5 hover:shadow-lg
                     text-sm mx-auto"
          >
            View Instructions
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipeSearchResults = ({ recipes = [] }) => {
  // Handle loading state
  if (!recipes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="w-full max-w-7xl mx-auto">
          <p className="text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  // Handle empty results
  if (recipes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            No Recipes Found
          </h1>
          <p className="text-gray-600">
            Try searching with different ingredients
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-700 mb-2">
            Recipe Search Results
          </h1>
          <p className="text-gray-600">
            Found {recipes.length} delicious recipes with your ingredients
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Click on any recipe to view detailed instructions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchResults;
