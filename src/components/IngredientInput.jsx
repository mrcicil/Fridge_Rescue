import React, { useState } from 'react';

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
    if (ingredients.length >= 2) {
      onSearch(ingredients);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-recipe-800 text-center mb-8">
        What's in your fridge?
      </h2>
      
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient"
          className="flex-1 px-6 py-3 rounded-lg border border-recipe-200 
                    focus:ring-2 focus:ring-recipe-500 focus:border-recipe-500
                    transition-colors duration-200 bg-white text-recipe-800
                    placeholder-recipe-400"
        />
        <button 
          onClick={handleAddIngredient}
          className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 min-h-[100px] p-4 bg-recipe-50 rounded-lg">
        {ingredients.map((ingredient, index) => (
          <div 
            key={index} 
            className="inline-flex items-center bg-white px-4 py-2 rounded-full
                     shadow-sm border border-recipe-200"
          >
            <span className="text-recipe-700 mr-2">{ingredient}</span>
            <button
              onClick={() => handleRemoveIngredient(index)}
              className="text-recipe-400 hover:text-recipe-600 transition-colors
                       duration-200 font-bold text-xl leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
         {ingredients.length < 2 && (
            <p className="text-recipe-600 mb-4">
              Please add at least 2 ingredients to search for recipes
            </p>
          )}
        <button
          onClick={handleSubmit}
          disabled={ingredients.length < 2 }
          className="inline-block bg-gray-600 !text-white px-8 py-4 rounded-lg 
                   font-semibold text-lg transition-all duration-300 
                   hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:transform-none"
        >
          Find Recipes
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;