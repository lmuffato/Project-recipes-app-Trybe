import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import '../../style/IngredientsListCheckbox.css';
import InProgressContext from '../../contexts/InProgressContext';

export default function IngredientsListCheckbox({ recipe, isFood, isDrink }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;

  const [fullRecipe, setFullRecipe] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);

  const {
    setInProgressDrinks,
    setInProgressFoods } = useContext(InProgressContext);

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

  useEffect(() => {
    if (usedIngredients) {
      if (isFood) {
        setInProgressFoods({ [recipeId]: usedIngredients });
      } else {
        setInProgressDrinks({ [recipeId]: usedIngredients });
      }
    }
  }, [usedIngredients, isFood, setInProgressFoods, setInProgressDrinks, recipeId]);

  useEffect(() => {
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const foodsInLS = inProgressRecipesLS.meals;
    const drinksInLS = inProgressRecipesLS.cocktails;

    if (isFood && Object.keys(foodsInLS).length > 0) {
      setUsedIngredients(foodsInLS[recipeId]);
    }
    if (isDrink && Object.keys(drinksInLS).length > 0) {
      setUsedIngredients(drinksInLS[recipeId]);
    }
  }, [isFood, isDrink, recipeId]);

  function handleCheckIngredient(ev) {
    const ingredient = ev.target.value;
    const isUsed = usedIngredients.includes(ingredient);
    if (!isUsed) {
      setUsedIngredients([...usedIngredients, ingredient]);
    } else {
      setUsedIngredients(usedIngredients.filter(((ing) => ing !== ingredient)));
    }
  }
  console.log('primeiro render');
  return (
    <div className="ingredients-checkbox-container">
      <strong>Ingredients</strong>
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
