import React, { createContext, useContext, useState, useEffect } from "react";
import { getMemberFavorites, addToFavorites, removeFromFavorites, updateFavorite } from '../api/favoritesapi';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    const memberId = localStorage.getItem("userId");
    if (!memberId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMemberFavorites(memberId);
      setFavorites(data);
    } catch (err) {
      setError("Failed to load favorites");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (recipeId) => {
    const memberId = localStorage.getItem("userId");
    if (!memberId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newFavorite = await addToFavorites(memberId, recipeId);
      setFavorites([...favorites, newFavorite]);
      return newFavorite;
    } catch (err) {
      setError("Failed to add to favorites");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId) => {
    const memberId = localStorage.getItem("userId");
    if (!memberId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await removeFromFavorites(memberId, favoriteId);
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      setError("Failed to remove from favorites");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFavoriteRecipe = async (favoriteId, favoriteData) => {
    const memberId = localStorage.getItem("userId");
    if (!memberId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedFavorite = await updateFavorite(memberId, favoriteId, favoriteData);
      setFavorites(favorites.map(fav => 
        fav.id === favoriteId ? updatedFavorite : fav
      ));
      return updatedFavorite;
    } catch (err) {
      setError("Failed to update favorite");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load favorites when user logs in
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchFavorites();
    }
  }, []);

  const value = {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    updateFavoriteRecipe
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};