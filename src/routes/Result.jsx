import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import styles from "./Result.module.css"; // Import CSS Module
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
  console.log("recipeData from Result.jsx", recipeData);

  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resultsRaw = await getRecipeInstructions(id);

      console.log("results from Result.jsx", resultsRaw);

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

      console.log("results from Result.jsx", resultsRaw);
      //console.log("JSON.stringify(results[0])", JSON.stringify(results[0]));

      //const results = JSON.stringify(resultsRaw[0]);
      const results = resultsRaw;
      console.log("results after JSON", results);

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

  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  useEffect(() => {
    //fetchMockData();
     fetchData();
  }, [id]);

  // Fetch recipes from API

  // Show results
  //setShowResults(true);

  // const recipeSteps = recipe_detail_data[0].steps;
  // console.log("recipeSteps", recipeSteps);

  //const { recipeData } = state || {}; // Destructure (fallback to {} if state is undefined)

  // const recipeSteps = state.recipeData[0].steps;
  //const recipeId = state.recipeData.id;
  //console.log("recipeId", recipeId);

  // return (
  //   <div className={styles.recipeInstructions}>
  //     {/* Add back button at the top */}
  //     <button
  //       onClick={() => navigate(-1)} // Goes back one page in history
  //       className={styles.backButton} // Style this in your CSS
  //     >
  //       &larr; Back
  //     </button>

  //     <br />
  //     <h2>Recipe Instructions</h2>
  //     <table className={styles.table}>
  //       {/* Rest of your existing table code */}
  //       <thead>
  //         <tr className={styles.header}>
  //           <th className={styles.cell}>Step</th>
  //           <th className={styles.cell}>Instruction</th>
  //           <th className={styles.cell}>Ingredients</th>
  //           <th className={styles.cell}>Equipment</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {recipeInstructions.map((step) => (
  //           <tr key={step.number}>
  //             <td className={styles.cell}>{step.number}</td>
  //             <td className={styles.cell}>{step.step}</td>
  //             <td className={styles.cell}>
  //               {step.ingredients.length > 0 ? (
  //                 <ul className={styles.list}>
  //                   {step.ingredients.map((ingredient) => (
  //                     <li key={ingredient.id}>{ingredient.name}</li>
  //                   ))}
  //                 </ul>
  //               ) : (
  //                 "-"
  //               )}
  //             </td>
  //             <td className={styles.cell}>
  //               {step.equipment.length > 0 ? (
  //                 <ul className={styles.list}>
  //                   {step.equipment.map((item) => (
  //                     <li key={item.id}>{item.name}</li>
  //                   ))}
  //                 </ul>
  //               ) : (
  //                 "-"
  //               )}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

return (
  <div className="min-h-dvh md:flex justify-center items-center md:bg-eggshell">
    <article className="bg-white p-6 md:my-20 md:rounded-xl md:max-w-screen-md shadow-lg relative">
      {/* Back button inside the recipe box with proper spacing */}
      {/* Header with back button and title */}
      <div className="flex items-center mb-6 relative"> {/* Container for header */}
        <button 
          onClick={() => navigate(-1)} // Go back one page in history
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

      {/* Recipe Title */}
      {/* <div className="text-center mb-4"> */}
        <h1 className="text-3xl font-bold text-black font-outfit flex-1 text-center">
          {recipeData.title}
        </h1>
      </div>

      {/* Recipe Image */}
      <picture>
        <img
          className="max-w-sm mx-auto my-4 rounded-lg shadow"
          src={recipeData.image}
          alt={recipeData.title}
        />
      </picture>

      {/* Required Ingredients Section */}
      <div className="font-outfit text-left">
        <h2 className="text-xl font-semibold mb-2 text-black">Required Ingredients</h2>
        
        {/* Used Ingredients (what you have) */}
        {recipeData.usedIngredients.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-black">Ingredients You Have:</h3>
            <ul className="list-disc pl-5 text-black space-y-1">
              {recipeData.usedIngredients.map((ingredient, index) => (
                <li key={`used-${index}`}>
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missed Ingredients (what you need) */}
        {recipeData.missedIngredients.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-black">Ingredients You Need:</h3>
            <ul className="list-disc pl-5 text-black space-y-1">
              {recipeData.missedIngredients.map((ingredient, index) => (
                <li key={`missed-${index}`}>
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-full h-px bg-light-gray my-6"></div>
          {/* Equipment Section - Left Aligned */}
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-2 text-black">Equipment</h2>
            <ul className="list-disc pl-5 mb-4 text-black space-y-1">
              {Array.from(
                new Map(
                  recipeInstructions
                    .flatMap((step) => step.equipment)
                    .map((item) => [item.id, item])
                ).values()
              ).map((equipment) => (
                <li key={equipment.id}>{equipment.name}</li>
              ))}
            </ul>
          </div>
          <div className="w-full h-px bg-light-gray my-6"></div>
          {/* Instructions Section - Left Aligned */}
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-2 text-black">
              Instructions
            </h2>
            <ol className="list-decimal pl-5 mb-6 text-black space-y-4">
              {recipeInstructions.map((step) => (
                <li key={step.number} className="pl-2">
                  <div className="font-bold">Step {step.number}:</div>
                  <p>{step.step}</p>
                  {step.length && (
                    <p className="text-sm text-gray-600">
                      Duration: {step.length.number} {step.length.unit}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="w-full h-px bg-light-gray my-6"></div>
          {/* Print button (unchanged) */}
          <div className="text-center">
            <button className="bg-biege text-black px-4 py-2 rounded-lg hover:bg-biege-800">
              Print Recipe
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Result;
