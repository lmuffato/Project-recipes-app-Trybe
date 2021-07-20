import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import checkIngredientIsDone from '../service/checkIngredientIsDone';
import checkRecipeIsCompleted from '../service/checkRecipeIsCompleted';
import toogleInProgressIngrLS from '../service/toogleInProgressIngrLS';

function Ingredients({ recipe }) {
  const { pathname } = useLocation();
  const [flagUpdate, setFlagUpdate] = useState(false);
  const { setIsCompleted } = useContext(ContextRecipes);
  const dbType = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const id = dbType === 'meals' ? recipe.idMeal : recipe.idDrink;
  const isInProgress = pathname.includes('in-progress');
  const recipeEntries = Object.entries(recipe);

  const measuresList = [];
  const ingredientsList = recipeEntries ? recipeEntries.reduce((acc, enter) => {
    if (enter[0]
      .includes('Ingredient') && enter[1] !== '' && enter[1]) acc.push(enter[1]);
    if (enter[0]
      .includes('Measure') && enter[1] !== '' && enter[1]) measuresList.push(enter[1]);
    return acc;
  }, []) : [];

  useEffect(() => {
    setIsCompleted(checkRecipeIsCompleted(dbType, id, ingredientsList));
  }, [flagUpdate]);

  return (
    <div>
      <h3>Ingredientes:</h3>
      <ul>
        {ingredientsList.map((ingredient, index) => {
          const isDone = checkIngredientIsDone(dbType, id, ingredient);
          const decoration = isDone && isInProgress ? 'line-through' : 'none';
          const checkbox = (
            <input
              type="checkbox"
              onChange={ () => {
                toogleInProgressIngrLS(dbType, id, ingredient);
                setFlagUpdate(!flagUpdate);
              } }
              checked={ isDone }
            />);
          return (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              {isInProgress && checkbox}

              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
                style={ { 'text-decoration': decoration } }
              >
                {`${ingredient} - ${measuresList[index]}`}
              </li>
            </div>
          );
        })}

      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Ingredients;
