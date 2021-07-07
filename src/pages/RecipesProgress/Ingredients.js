import React from 'react';
import PropTypes from 'prop-types';
import './Ingredients.css';

export default function Ingredients({ recipe }) {
  function getIngredients() {
    const ingredients = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    return ingredients;
  }
  function getMeasures() {
    const measures = Object.entries(recipe)
      .filter((property) => {
        const checkKey = property[0].includes('strMeasure');
        const checkValue = property[1];
        return checkKey && checkValue;
      });
    return measures;
  }

  return (
    <div className="ingredients">

      {getIngredients().map(
        (ingredient, index) => (
          <div key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient[1] }
            >
              <input
                id={ ingredient[1] }
                type="checkbox"
              />
              <span>{`${ingredient[1]} - ${getMeasures()[index][1]}`}</span>
            </label>
            <br />
          </div>
        ),
      )}
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;
