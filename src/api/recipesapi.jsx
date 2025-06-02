import axios from 'axios';
import {recipe_detail} from '../search_result'
import { recipe_detail_data } from '../recipe_detail_data';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

//error handling - missing API key
if (!API_KEY) {
  console.error('API Key is missing. Please check your environment variables.');
}

// Create axios instance with default config
const spoonacularApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

//error handling - add request
spoonacularApi.interceptors.request.use(
  (config) => {
    if (!API_KEY) {
      return Promise.reject(new Error('API Key is not configured'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//error handling - add response
spoonacularApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Invalid API Key');
          break;
        case 402:
          console.error('API Key quota exceeded');
          break;
        case 429:
          console.error('Rate limit exceeded');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export const findRecipesByIngredients = async (ingredients) => {
  try {
    const response = await spoonacularApi.get('/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10,
        ranking: 2,
        ignorePantry: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const findRecipesByIngredientsMock = () => recipe_detail;

export const getRecipeInstructions = async (id) => {
  try {
    const response = await spoonacularApi.get(`/${id}/analyzedInstructions`);
    // const response = await spoonacularApi.get(`/${id}/information`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};


export const getRecipeInstructionsMock = () => recipe_detail_data;
