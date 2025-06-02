import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import styles from "./Result.module.css"; // Import CSS Module
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getRecipeInstructions } from "../api/recipesapi";

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
      const results = await getRecipeInstructions(id);

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
      const results = recipe_detail_data[0].steps;

      //const jsonString = JSON.stringify(jsonData[0]); // Removes outer []


      console.log("results from Result.jsx", results);
      console.log("JSON.stringify(results[0])", JSON.stringify(results[0]));


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
    fetchMockData();
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
    <article className="bg-white p-6 md:my-20 md:rounded-xl md:max-w-screen-md shadow-lg">
      {/* Back button */}
      <button
        onClick={() => navigate.goBack()}
        className="fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
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

      {/* Recipe Image */}
      <picture>
        <img
          className="max-w-sm mx-auto my-4 rounded-lg shadow"
          src="https://images.unsplash.com/photo-1616031037011-087000171abe"
          alt="Recipe"
        />
      </picture>

      <div className="font-outfit">
        <h1 className="text-2xl font-bold mb-4 text-dark-charcoal">
          Recipe Instructions
        </h1>

        {/* Ingredients Section - Deduplicated */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-nutmeg">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {Array.from(
              new Map(
                recipeInstructions
                  .flatMap(step => step.ingredients)
                  .map(item => [item.id, item])
              ).values()
            ).map(ingredient => (
              <li key={ingredient.id} className="mb-2">
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-light-gray my-6"></div>

        {/* Equipment Section - Added */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-nutmeg">Equipment</h2>
          <ul className="list-disc list-inside mb-4">
            {Array.from(
              new Map(
                recipeInstructions
                  .flatMap(step => step.equipment)
                  .map(item => [item.id, item])
              ).values()
            ).map(equipment => (
              <li key={equipment.id} className="mb-2">
                {equipment.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-light-gray my-6"></div>

        {/* Instructions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-nutmeg">Instructions</h2>
          <ol className="list-decimal list-inside mb-6">
            {recipeInstructions.map((step) => (
              <li key={step.number} className="mb-4">
                <div className="font-bold">Step {step.number}:</div>
                <p>{step.step}</p>
                {step.length && (
                  <p className="text-sm text-gray-600 mt-1">
                    Duration: {step.length.number} {step.length.unit}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="w-full h-px bg-light-gray my-6"></div>

        {/* Print button */}
        <div className="text-center">
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Print Recipe
          </button>
        </div>
      </div>
    </article>
  </div>
);
}

export default Result;
