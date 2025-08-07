import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
//import { getFavorite } from '../api/favoritesapi';
import fridgeLogo from '../assets/fridge_rescue.png';
import { updateFavorite, getFavorite } from '../api/recipesapi';

function FavoriteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateFavoriteRecipe } = useFavorites();
  
  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      try {
        const memberId = localStorage.getItem("userId");
        if (!memberId) {
          navigate('/login');
          return;
        }
        
        const data = await getFavorite(memberId, id);
        setFavorite(data);
        setCustomTitle(data.customTitle || data.recipeTitle);
        setCustomDescription(data.customDescription || data.recipeDescription);
        setCustomNotes(data.customNotes || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to load favorite recipe details');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchFavoriteDetails();
  }, [id, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateFavoriteRecipe(id, {
        customTitle,
        customDescription,
        customNotes
      });
      
      navigate('/favorites');
    } catch (err) {
      setError('Failed to update favorite recipe');
      console.error(err);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-recipe-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600">Loading recipe details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !favorite) {
    return (
      <div className="min-h-screen bg-recipe-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">{error || 'Recipe not found'}</p>
            <button
              onClick={() => navigate('/favorites')}
              className="mt-4 inline-block bg-gray-600 !text-white px-4 py-2 rounded-lg font-medium"
            >
              Back to Favorites
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-recipe-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img
            src={fridgeLogo}
            alt="Fridge Rescue"
            className="w-32 h-auto mx-auto mb-6 animate-float"
          />
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            Edit Favorite Recipe
          </h1>
          <p className="text-gray-600">
            Personalize this recipe to your taste
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/favorites')}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              Editing: {favorite.recipeTitle}
            </h2>
          </div>
          
          <div className="mb-6">
            <img
              src={favorite.recipeImage}
              alt={favorite.recipeTitle}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Title
              </label>
              <input
                type="text"
                id="customTitle"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a custom title for this recipe"
              />
            </div>
            
            <div>
              <label htmlFor="customDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Description
              </label>
              <textarea
                id="customDescription"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a custom description"
              />
            </div>
            
            <div>
              <label htmlFor="customNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Personal Notes
              </label>
              <textarea
                id="customNotes"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your personal notes, modifications, or tips for this recipe"
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/favorites')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FavoriteEdit;