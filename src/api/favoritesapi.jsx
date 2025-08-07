import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/favorites';

// Get all favorites for a member
export const getMemberFavorites = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

// Add a recipe to favorites
export const addToFavorites = async (memberId, recipeId) => {
  try {
    const response = await axios.post(`${BASE_URL}/member/${memberId}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove a recipe from favorites
export const removeFromFavorites = async (memberId, favoriteId) => {
  try {
    await axios.delete(`${BASE_URL}/member/${memberId}/${favoriteId}`);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Update a favorite recipe
export const updateFavorite = async (memberId, favoriteId, favoriteData) => {
  try {
    const response = await axios.put(`${BASE_URL}/member/${memberId}/${favoriteId}`, favoriteData);
    return response.data;
  } catch (error) {
    console.error('Error updating favorite:', error);
    throw error;
  }
};

// Check if a recipe is in favorites
export const checkIsFavorite = async (memberId, recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/${memberId}/check/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Get a specific favorite
export const getFavorite = async (memberId, favoriteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/${memberId}/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite:', error);
    throw error;
  }
};