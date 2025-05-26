import React, { useState } from 'react';
import styles from './IngredientInput.module.css';

const IngredientInput = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onSearch(ingredients);
      console.log(ingredients);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  return (
    <div className={styles.ingredientInput}>
      <h2 className={styles.title}>What's in your fridge?</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient"
          className={styles.input}
        />
        <button onClick={handleAddIngredient} className={styles.addButton}>
          Add
        </button>
      </div>

      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientTag}>
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(index)}
              className={styles.removeButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        className={styles.findRecipesButton}
        onClick={handleSubmit}
        disabled={ingredients.length === 0}
      >
        Find Recipes
      </button>
    </div>
  );
};

export default IngredientInput;