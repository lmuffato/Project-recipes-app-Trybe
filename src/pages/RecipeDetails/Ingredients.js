import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  function getIngredients() {
    return Object.entries(recipe)
      .filter((property) => (
        property[0].includes('strIngredient') && property[1]));
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
    setMeasures(getMeasures());
  }, [recipe]);

  return (
    <div className="ingredients-details">
      <h3>Ingredients</h3>
      <ul>
        { ingredients.length && measures.length
          ? ingredients.map(
            (ingredient, index) => (
              <li
                className="ingredients-list"
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient[1]} - ${measures[index][1]}`}
              </li>),
          ) : ''}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
