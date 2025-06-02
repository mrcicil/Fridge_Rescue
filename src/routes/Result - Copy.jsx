import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import styles from "./Result.module.css"; // Import CSS Module
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getRecipeInstructions } from "../api/recipesapi";

function Result({  }) {

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

  const fetchMockData =  () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = recipe_detail_data[0].steps;
      console.log("results from Result.jsx", results);
      
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
      <article className="bg-gray-100 md:my-20 md:py-8 pb-8 md:rounded-xl md:max-w-screen-md">
        {/* Back button at the top */}
        <button 
          onClick={() => navigate.goBack()}
          className="fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Recipe Image */}
        <picture>
          {/* <img
            src={omeletteImage}
            alt="Photo of the prepared recipe"
            className="w-full md:max-w-[90%] md:mx-auto md:rounded-xl"
          /> */}
        </picture>

        <div className="px-8 font-outfit text-wenge-brown">
          <h1 className="font-young-serif text-4xl mt-8 text-dark-charcoal">
            Recipe Instructions
          </h1>

          {/* Ingredients Section */}
          <div className="mt-8">
            <h3 className="font-young-serif text-3xl text-nutmeg">Ingredients</h3>
            <ul className="list-disc marker:text-nutmeg mt-4 ml-6 space-y-2">
              {recipeInstructions.flatMap(step => 
                step.ingredients.map(ingredient => (
                  <li key={ingredient.id} className="pl-4">
                    {ingredient.name}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="w-full h-px bg-light-gray my-8"></div>

          {/* Instructions Section */}
          <div className="mt-8">
            <h3 className="font-young-serif text-3xl text-nutmeg">Instructions</h3>
            <ol className="marker:text-nutmeg marker:font-semibold list-decimal mt-4 ml-6 space-y-2">
              {recipeInstructions.map((step) => (
                <li key={step.number} className="pl-4">
                  <p>
                    <span className="font-bold">Step {step.number}: </span>
                    {step.step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="w-full h-px bg-light-gray my-8"></div>

          {/* Nutrition Section */}
          <div className="mt-8">
            <h3 className="font-young-serif text-3xl text-nutmeg">Nutrition</h3>
            <p className="mt-4">
              Nutritional values per serving.
            </p>
            <ul className="mt-6">
              {/* {nutritionData.map((item) => (
                <li key={item.name}>
                  <div className="flex py-3 border-b border-light-gray last:border-0">
                    <span className="w-1/2 pl-8">{item.name}</span>
                    <span className="w-1/2 font-bold text-nutmeg">{item.value}</span>
                  </div>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}


export default Result;
