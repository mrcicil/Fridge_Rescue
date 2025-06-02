import axios from 'axios';
import {recipe_detail} from '../search_result'
import { recipe_detail_data } from '../recipe_detail_data';

const API_KEY = 'YOUR_SPOONACULAR_API_KEY';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const findRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        apiKey: 'a409b8ffc3e748afba9a096a759a4c2c',
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
    // const response = await axios.get(`${BASE_URL}/${id}/information`, {
    const response = await axios.get(`${BASE_URL}/${id}/analyzedInstructions`, {
      params: {
        apiKey: 'a409b8ffc3e748afba9a096a759a4c2c'
      }
    });
    console.log("response.data", response.data);
    const recipeSteps = response.data[0]?.steps || [];
    console.log("recipeSteps", recipeSteps);
    return recipeSteps;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};


export const getRecipeInstructionsMock = () => recipe_detail_data;
