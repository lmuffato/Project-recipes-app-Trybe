import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';

import Container from './style';
import { RecipesInProgressContext } from '../../context/RecipesInProgressContext';

function RecipeIngredients({ recipe, idMeal, type }) {
  const keysAndValues = Object.entries(recipe);

  const [checked, setChecked] = useState([]);

  const {
    cocktails,
    setCocktailsIngredients,
    meals,
    setMealsIngredients } = useContext(RecipesInProgressContext);

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  const setContextIngredients = useCallback(() => {
    switch (type) {
    case 'meals':
      setMealsIngredients({
        [idMeal]: checked,
      });
      break;
    case 'drinks':
      setCocktailsIngredients({
        [idMeal]: checked,
      });
      break;
    default:
      break;
    }
  }, [
    checked,
    idMeal,
    type,
    setMealsIngredients,
    setCocktailsIngredients]);

  useEffect(() => {
    setContextIngredients();
  }, [checked, setContextIngredients]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setChecked([...checked, parseInt(target.value, 10)]);
      target.parentNode.style.textDecoration = 'line-through';
    } else {
      setChecked(checked.filter((check) => check !== parseInt(target.value, 10)));
      target.parentNode.style.textDecoration = 'none';
    }
  };

  useEffect(() => {
    if (checked.length > 0) {
      const recipesKeys = {
        cocktails,
        meals,
      };
      const jsonRecipes = JSON.stringify(recipesKeys);
      localStorage.setItem('inProgressRecipes', jsonRecipes);
    }
  }, [cocktails, meals, checked]);

  useEffect(() => {
    const recipesJson = localStorage.getItem('inProgressRecipes');
    const storageRecipes = JSON.parse(recipesJson);

    switch (type) {
    case 'meals':
      setChecked(storageRecipes.meals[idMeal]);
      break;
    case 'drinks':
      setChecked(storageRecipes.cocktails[idMeal]);
      break;
    default:
      break;
    }
  }, [idMeal, type]);

  return (
    <Container className="ing">
      {ingredients.map((element, index) => (
        <label htmlFor={ element } key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            id={ element }
            value={ index }
            checked={ checked.includes(index) }
            onChange={ handleChange }
          />
          { measures[index]}
          {' '}
          { element }
        </label>))}
    </Container>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
  idMeal: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
