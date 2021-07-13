import React, { useEffect, useState } from 'react';

export default function Ingredients({ recipe }) {
  const [ingredients, setIngredients] = useState([]);

  function getIngredients() {
    const ingredientsList = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    return ingredientsList;
  }

  function getMeasures() {
    const measuresList = Object.entries(recipe)
      .filter((property) => {
        const checkKey = property[0].includes('strMeasure');
        const checkValue = property[1];
        return checkKey && checkValue;
      });
    return measuresList;
  }

  useEffect(() => {
    setIngredients(getIngredients());
  }, [recipe]);

  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        { ingredients.length
          ? ingredients.map(
            (ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient[1]} - ${getMeasures()[index][1]}`}
              </li>),
          ) : ''}
      </ul>
    </div>
  );
}
