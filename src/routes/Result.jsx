import fridgeLogo from "../assets/fridge_rescue.png";
import { recipe_detail } from "../search_result";
import { recipe_detail_data } from "../recipe_detail_data";
import styles from "./Result.module.css"; // Import CSS Module

function Result() {
  const recipeSteps = recipe_detail_data[0].steps;
  console.log("recipeSteps", recipeSteps);

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
          {recipeSteps.map((step) => (
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