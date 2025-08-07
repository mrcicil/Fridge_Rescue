import React, { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import fridgeLogo from '../assets/fridge_rescue.png';

function Favorites() {
  const { favorites, loading, error, fetchFavorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleEdit = (favoriteId) => {
    navigate(`/favorites/edit/${favoriteId}`);
  };

  const handleDelete = async (favoriteId) => {
    if (window.confirm('Are you sure you want to remove this recipe from your favorites?')) {
      try {
        await removeFavorite(favoriteId);
      } catch (err) {
        console.error('Error removing favorite:', err);
      }
    }
  };

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-recipe-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600">Loading your favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-recipe-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-recipe-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <img
            src={fridgeLogo}
            alt="Fridge Rescue"
            className="w-32 h-auto mx-auto mb-6 animate-float"
          />
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            My Favorite Recipes
          </h1>
          <p className="text-gray-600">
            Manage your saved recipes and personalize them to your taste
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 mb-4">You haven't saved any recipes to your favorites yet.</p>
            <button
              onClick={() => navigate('/search')}
              className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
            >
              Find Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div 
                key={favorite.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={favorite.recipeImage}
                    alt={favorite.customTitle || favorite.recipeTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {favorite.customTitle || favorite.recipeTitle}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {favorite.customDescription || favorite.recipeDescription}
                  </p>
                  
                  {favorite.customNotes && (
                    <div className="mb-4 bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">My Notes:</span> {favorite.customNotes}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleViewRecipe(favorite.recipeId)}
                      className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700"
                    >
                      View Recipe
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(favorite.id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(favorite.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
                