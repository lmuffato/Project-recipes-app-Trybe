import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../../style/IngredientsListCheckbox.css';

export default function IngredientsListCheckbox({
  recipe,
  handleCheckIngredient,
  usedIngredients }) {
  const [fullRecipe, setFullRecipe] = useState([]);
  // const [usedIngredients, setUsedIngredients] = useState([]);

  useEffect(() => {
    // define state with recipe
    const allIngredients = Object.entries(recipe).filter(
      (entry) => entry[0].includes('Ingredient'),
    );

    const validIngredients = allIngredients.filter((ing) => ing[1]);

    const allMeasures = Object.entries(recipe).filter(
      (entry) => entry[0].includes('Measure'),
    );

    const ingredientsAndMeasures = validIngredients.map((ing, index) => {
      const ingredient = ing[1];
      const measure = allMeasures[index][1];
      return [ingredient, measure];
    });

    setFullRecipe(ingredientsAndMeasures);
  }, [recipe]);

  return (
    <div className="ingredients-checkbox-container">
      <h3>Ingredients</h3>
      {fullRecipe.map((ing, index) => (
        <label
          htmlFor="ingredient-checkbox"
          key={ index }
          className="checkbox-container"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            name="ingredient-checkbox"
            value={ ing[0] }
            onChange={ (ev) => handleCheckIngredient(ev) }
            checked={ usedIngredients.includes(ing[0]) }
          />
          <p
            className={ usedIngredients.includes(ing[0]) ? 'crossed' : '' }
          >
            {`${ing[0]} - ${ing[1] ? ing[1] : 'a vonts'}`}
          </p>
        </label>
      ))}

    </div>
  );
}

IngredientsListCheckbox.propTypes = {
  recipes: PropTypes.shape({}),
  isFood: PropTypes.bool,
  isDrink: PropTypes.bool,
}.isRequired;
