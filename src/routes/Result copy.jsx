import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import styles from "./Result.module.css"; // Import CSS Module
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { getRecipeInstructions } from "../api/recipesapi";

function Result() {
  const { id } = useParams(); // Extract URL param (e.g., `:id`)

  const { state } = useLocation(); // Access the passed state
  const [isLoading, setIsLoading] = useState(false);
  //console.log("state", state);

  const [recipeInstructions, setRecipeInstructions] = useState([]);

  useEffect(() => {
    // // Fetch API
    // const results = getRecipeInstructions(id);

    // // Store results in state
    // setRecipeInstructions(results);
    // console.log("results", results);

    // ✅ Correct: Define async function inside useEffect
    const fetchData = async () => {


      setIsLoading(true);
      try {
        // ... existing code ...
              const results = getRecipeInstructions(id);
      console.log("results", results);
      //const resultsSteps = results[0].steps;
      setRecipeInstructions(results);
      console.log("results", results);
      console.log("recipeInstructions from Results", recipeInstructions);

      // 2. Validate the response
      if (!results || !Array.isArray(results) || results.length === 0) {
        console.warn("No valid instructions received");
        setRecipeInstructions([]); // Set empty array as fallback
        return;
      }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
    console.log("");
  }, []); // Empty dependency array = run once

  // Fetch recipes from API

  // Show results
  //setShowResults(true);

  // const recipeSteps = recipe_detail_data[0].steps;
  // console.log("recipeSteps", recipeSteps);

  //const { recipeData } = state || {}; // Destructure (fallback to {} if state is undefined)

  // const recipeSteps = state.recipeData[0].steps;
  const recipeId = state.recipeData.id;
  //console.log("recipeId", recipeId);

  return (
    <div className={styles.recipeInstructions}>
      <br />
      <h2>Recipe Instructions</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th className={styles.cell}>Step</th>
            <th className={styles.cell}>Instruction</th>
            <th className={styles.cell}>Ingredients</th>
            <th className={styles.cell}>Equipment</th>
          </tr>
        </thead>
        <tbody>
          {recipeInstructions.map((step) => (
            <tr key={step.number}>
              <td className={styles.cell}>{step.number}</td>
              <td className={styles.cell}>{step.step}</td>
              <td className={styles.cell}>
                {step.ingredients.length > 0 ? (
                  <ul className={styles.list}>
                    {step.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                ) : (
                  "-"
                )}
              </td>
              <td className={styles.cell}>
                {step.equipment.length > 0 ? (
                  <ul className={styles.list}>
                    {step.equipment.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
