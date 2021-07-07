import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientsListCheckbox({ recipe }) {
  const [fullRecipe, setFullRecipe] = useState([]);

  useEffect(() => {
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
    <div>
      <strong>Ingredients</strong>
      {fullRecipe.map((ing, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          {`${ing[0]} - ${ing[1] ? ing[1] : 'a vonts'}`}
        </p>
      ))}

    </div>
  );
}

IngredientsListCheckbox.propTypes = {
  recipes: PropTypes.shape({}),
  isFood: PropTypes.bool,
  isDrink: PropTypes.bool,
}.isRequired;
