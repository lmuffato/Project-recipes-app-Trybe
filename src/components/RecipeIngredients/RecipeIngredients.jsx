import React from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/fetchFilteredRecipes';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  return (
    <>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((element, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { measures[index]}
            {' '}
            { element }
          </li>))}
      </ul>
    </>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
