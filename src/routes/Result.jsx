import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
//import styles from "./Result.module.css"; // Import CSS Module
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  getRecipeInstructions,
  getRecipeInstructionsMock,
} from "../api/recipesapi";

function Result({}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Access the passed state
  const { state } = useLocation();

  // Destructure the data (with optional fallback)
  const { recipeData } = state || {};


  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resultsRaw = await getRecipeInstructions(id);

      const results = resultsRaw[0].steps;

      if (results?.length) {
        setRecipeInstructions(results);
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

  const fetchMockData = () => {
    setIsLoading(true);
    setError(null);

    try {
      //const results = recipe_detail_data[0].steps;

      //const jsonString = JSON.stringify(jsonData[0]); // Removes outer []

      const resultsRaw = getRecipeInstructionsMock();
      //const results = recipe_detail_data;

      const results = resultsRaw;

      if (results?.length) {
        setRecipeInstructions(results);
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

  useEffect(() => {
    //fetchMockData();
     fetchData();
  }, [id]);

    function handlePrint() {
      window.print()
//the window.print() command is what is telling the browser to print the page
  }

  return (
    <div className="max-w-7xl mx-auto px-5 min-h-screen bg-recipe-50 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header with back button and title */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/search')}
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
            {recipeData.usedIngredients.length > 0 && (
              <div className="bg-green-50 dark:bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-800 mb-3">
                  Ingredients You Have:
                </h3>
                <ul className="space-y-2">
                  {recipeData.usedIngredients.map((ingredient, index) => (
                    <li key={`used-${index}`} className="flex items-center gap-2 text-green-700 dark:text-green-700">
                      <span className="text-green-500">✓</span>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients You Need */}
            {recipeData.missedIngredients.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-800 mb-3">
                  Ingredients You Need:
                </h3>
                <ul className="space-y-2">
                  {recipeData.missedIngredients.map((ingredient, index) => (
                    <li key={`missed-${index}`} className="flex items-center gap-2 text-orange-700 dark:text-orange-700">
                      <span className="text-orange-500">+</span>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Equipment Section */}
          <section className="bg-gray-50 dark:bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-recipe-800 dark:text-gray-800 mb-4">
              Equipment
            </h2>
            <ul className="space-y-2">
              {Array.from(
                new Map(
                  recipeInstructions
                    .flatMap((step) => step.equipment)
                    .map((item) => [item.id, item])
                ).values()
              ).map((equipment) => (
                <li key={equipment.id} className="flex items-center gap-2 text-gray-700 dark:text-gray-700">
                  <span className="text-recipe-500">•</span>
                  {equipment.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-recipe-800 dark:text-white mb-6 text-left">
              Instructions
            </h2>
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
          </section>

          {/* Print Button - Matching style with other pages */}
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
