import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ recipe }) {
  const retObj = Object.entries(recipe);
  const listIngredients = retObj.filter((element) => (
    element[0].includes('Ingredient') && element[1]
  ));
  const filterAlcoohol = retObj.filter((element) => {
    const noAlcool = element[1] !== ' ' && element[1] !== null;
    return element[0].includes('Measure') && noAlcool;
  });

  return (
    <div>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {filterAlcoohol[index] ? (
              `${ingredient[1]} - ${filterAlcoohol[index][1]}`
            ) : (ingredient[1])}
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Ingredients;
