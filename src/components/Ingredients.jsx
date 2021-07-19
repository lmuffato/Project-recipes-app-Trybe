import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import toogleInProgressIngrLS from '../service/toogleInProgressIngrLS';

function Ingredients({ recipe }) {
  const { pathname } = useLocation();
  const dbType = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const id = dbType === 'meals' ? recipe.idMeal : recipe.idDrink;
  // const isInProgress = pathname.includes('in-progress');
  const recipeEntries = Object.entries(recipe);
  const ingredientsList = recipeEntries ? recipeEntries.reduce((acc, enter) => {
    if (enter[0].includes('Ingredien') && enter[1] !== '' && enter[1]) acc.push(enter[1]);
    return acc;
  }, []) : [];
  const measuresList = recipeEntries ? recipeEntries.reduce((acc, enter) => {
    if (enter[0].includes('Measure') && enter[1] !== '' && enter[1]) acc.push(enter[1]);
    return acc;
  }, []) : [];

  return (
    <div>
      <h3>Ingredientes:</h3>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <div key={ index } data-testid="ingredient-step">
            <input
              type="checkbox"
              onChange={ () => toogleInProgressIngrLS(dbType, id, ingredient) }
            />
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measuresList[index]}`}
            </li>
          </div>
        ))}

      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Ingredients;
