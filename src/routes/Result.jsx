// src/routes/Result.jsx
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from '../context/FavoritesContext';
import { getRecipe, getRecipeInstructions, checkIsFavorite } from '../api/recipesapi';
import fridgeLogo from "../assets/fridge_rescue.png";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Get recipe data from state if available
  const [recipeData, setRecipeData] = useState(state?.recipeData || null);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { addFavorite, removeFavorite } = useFavorites();

  // Fetch recipe data if not provided in state
  useEffect(() => {
    if (!recipeData && id) {
      const fetchRecipeData = async () => {
        setIsLoading(true);
        try {
          const data = await getRecipe(id);
          setRecipeData(data);
        } catch (err) {
          setError("Failed to load recipe details");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRecipeData();
    }
  }, [id, recipeData]);

  // Fetch recipe instructions
  useEffect(() => {
    if (id) {
      const fetchInstructions = async () => {
        setIsLoading(true);
        try {
          const results = await getRecipeInstructions(id);
          if (results && results.length > 0 && results[0].steps) {
            setRecipeInstructions(results[0].steps);
          } else {
            setError("No instructions found");
            setRecipeInstructions([]);
          }
        } catch (err) {
          setError("Failed to load instructions");
          setRecipeInstructions([]);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchInstructions();
    }
  }, [id]);

  // Check if recipe is in favorites
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const memberId = localStorage.getItem("userId");
      if (memberId && id) {
        try {
          const status = await checkIsFavorite(memberId, id);
          setIsFavorite(status);
        } catch (err) {
          console.error('Error checking favorite status:', err);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [id]);

  const handleFavoriteToggle = async () => {
    const memberId = localStorage.getItem("userId");
    if (!memberId) {
      navigate('/login');
      return;
    }
    
    setFavoriteLoading(true);
    
    try {
      if (isFavorite) {
        // Need to find the favorite ID first
        const favorites = await getMemberFavorites(memberId);
        const favorite = favorites.find(f => f.recipeId === id);
        if (favorite) {
          await removeFavorite(favorite.id);
          setIsFavorite(false);
        }
      } else {
        await addFavorite(id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  function handlePrint() {
    window.print();
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-2 min-h-screen bg-recipe-50 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <p className="text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !recipeData) {
    return (
      <div className="max-w-7xl mx-auto px-2 min-h-screen bg-recipe-50 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <p className="text-red-600">{error || "Recipe not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-block bg-gray-600 !text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Rest of your component rendering...
  return (
    <div className="max-w-7xl mx-auto px-2 min-h-screen bg-recipe-50 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header with back button and title */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center p-2 rounded-lg
                     bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                     dark:hover:bg-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-recipe-800 dark:text-gray-800 text-center flex-1">
            {recipeData.title}
          </h1>
        </div>

        {/* Favorite Button */}
        <div className="flex items-center justify-center mt-2 mb-4">
          <button
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
              viewBox="0 0 20 20"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={isFavorite ? 0 : 1.5}
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {favoriteLoading ? 'Processing...' : (isFavorite ? 'Saved to Favorites' : 'Add to Favorites')}
          </button>
        </div>

        {/* Recipe Image */}
        <div className="mb-8">
          <img
            className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
            src={recipeData.image}
            alt={recipeData.title}
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Ingredients Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-recipe-800 dark:text-gray-800">
              Required Ingredients
            </h2>
            
            {/* Ingredients You Have */}
            {recipeData.usedIngredients && recipeData.usedIngredients.length > 0 && (
              <div className="bg-green-50 dark:bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-800 mb-3">
                  Ingredients You Have:
                </h3>
                <ul className="space-y-2">
                  {recipeData.usedIngredients.map((ingredient, index) => (
                    <li key={`used-${index}`} className="flex items-center gap-2 text-green-700 dark:text-green-700">
                      <span className="text-green-500">✓</span>
                      {ingredient.original || ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients You Need */}
            {recipeData.missedIngredients && recipeData.missedIngredients.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-800 mb-3">
                  Ingredients You Need:
                </h3>
                <ul className="space-y-2">
                  {recipeData.missedIngredients.map((ingredient, index) => (
                    <li key={`missed-${index}`} className="flex items-center gap-2 text-orange-700 dark:text-orange-700">
                      <span className="text-orange-500">+</span>
                      {ingredient.original || ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* If no usedIngredients or missedIngredients, show all ingredients */}
            {(!recipeData.usedIngredients || !recipeData.missedIngredients) && recipeData.ingredients && (
              <div className="bg-blue-50 dark:bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-800 mb-3">
                  Ingredients:
                </h3>
                <ul className="space-y-2">
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={`ingredient-${index}`} className="flex items-center gap-2 text-blue-700 dark:text-blue-700">
                      <span className="text-blue-500">•</span>
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Instructions Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-recipe-800 dark:text-gray-800 mb-6 text-left">
              Instructions
            </h2>
            {recipeInstructions && recipeInstructions.length > 0 ? (
              <div className="space-y-4">
                {recipeInstructions.map((step) => (
                  <div 
                    key={step.number} 
                    className="bg-white dark:white text-gray-500 rounded-lg p-6 shadow-sm
                            border border-gray-100 dark:border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 dark:bg-gray-600 
                                  text-white rounded-full flex items-center justify-center 
                                  font-bold text-sm">
                        {step.number}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 text-left">
                        <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
                          {step.step}
                        </p>
                        {step.length && (
                          <p className="text-sm text-gray-500 dark:text-gray-700 mt-2 
                                    flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" 
                                viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {step.length.number} {step.length.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No instructions available for this recipe.</p>
            )}
          </section>

          {/* Print Button */}
          <div className="text-center mt-8 pb-4">
            <button
              onClick={handlePrint}
              className="inline-block bg-gray-600 dark:bg-gray-600 
                      !text-white px-6 py-3 rounded-lg font-semibold 
                      transition-all duration-300 
                      hover:bg-gray-700 dark:hover:bg-gray-700 
                      hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" 
                    viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Recipe
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
