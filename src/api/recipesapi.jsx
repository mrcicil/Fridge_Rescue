import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const recipeApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all recipes
export const getAllRecipes = async () => {
  try {
    const response = await recipeApi.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Get a single recipe by ID
export const getRecipe = async (recipeId) => {
  try {
    const response = await recipeApi.get(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

// Get recipe instructions
export const getRecipeInstructions = async (recipeId) => {
  try {
    const response = await recipeApi.get(`/recipes/${recipeId}/instructions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    throw error;
  }
};

// Search recipes by ingredients
export const findRecipesByIngredients = async (ingredients) => {
  try {
    const response = await recipeApi.get('/recipes/search', {
      params: {
        ingredients: ingredients.join(','),
        limit: 10
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Add favorite recipe
export const addToFavorites = async (memberId, recipeId) => {
  try {
    const response = await recipeApi.post(`/favorites/member/${memberId}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove from favorites
export const removeFromFavorites = async (memberId, favoriteId) => {
  try {
    await recipeApi.delete(`/favorites/member/${memberId}/${favoriteId}`);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Check if recipe is in favorites
export const checkIsFavorite = async (memberId, recipeId) => {
  try {
    const response = await recipeApi.get(`/favorites/member/${memberId}/check/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

export const updateFavorite = async (memberId, favoriteId, favoriteData) => {
  try {
    //const response = await axios.put(`${BASE_URL}/member/${memberId}/${favoriteId}`, favoriteData);
    const response = await recipeApi.put(`/favorites/member/${memberId}/${favoriteId}`, favoriteData);
    return response.data;
  } catch (error) {
    console.error('Error updating favorite:', error);
    throw error;
  }
};

export const getFavorite = async (memberId, favoriteId) => {
  try {
    const response = await recipeApi.get(`/favorites/member/${memberId}/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite:', error);
    throw error;
  }
};

export const getMemberFavorites = async (memberId) => {
  try {
    const response = await recipeApi.get(`/favorites/member/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

// For backward compatibility during transition
export const findRecipesByIngredientsMock = () => [];
export const getRecipeInstructionsMock = () => [];



// import axios from 'axios';
// import {recipe_detail} from '../search_result'
// import { recipe_detail_data } from '../recipe_detail_data';

// const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
// const BASE_URL = 'https://api.spoonacular.com/recipes';

// //error handling - missing API key
// if (!API_KEY) {
//   console.error('API Key is missing. Please check your environment variables.');
// }

// // Create axios instance with default config
// const spoonacularApi = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     apiKey: API_KEY
//   }
// });

// //error handling - add request
// spoonacularApi.interceptors.request.use(
//   (config) => {
//     if (!API_KEY) {
//       return Promise.reject(new Error('API Key is not configured'));
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// //error handling - add response
// spoonacularApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           console.error('Invalid API Key');
//           break;
//         case 402:
//           console.error('API Key quota exceeded');
//           break;
//         case 429:
//           console.error('Rate limit exceeded');
//           break;
//         default:
//           console.error('API Error:', error.response.data);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const findRecipesByIngredients = async (ingredients) => {
//   try {
//     const response = await spoonacularApi.get('/findByIngredients', {
//       params: {
//         ingredients: ingredients.join(','),
//         number: 10,
//         ranking: 2,
//         ignorePantry: true
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     throw error;
//   }
// };

// export const findRecipesByIngredientsMock = () => recipe_detail;

// export const getRecipeInstructions = async (id) => {
//   try {
//     const response = await spoonacularApi.get(`/${id}/analyzedInstructions`);
//     // const response = await spoonacularApi.get(`/${id}/information`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching recipe details:', error);
//     throw error;
//   }
// };


// export const getRecipeInstructionsMock = () => recipe_detail_data;
