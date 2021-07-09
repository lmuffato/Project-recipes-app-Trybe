import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Ingredients.css';

export default function Ingredients({ recipe }) {
  const [textInput, setTextInput] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [fromStorage, setFromStorage] = useState('');
  const key = 'inProgressRecipes';

  function getFromStorage() {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const result = JSON.parse(storageValue);
      const values = Object.values(result);
      setFromStorage(values[0]);
    }
  }

  function handleInput({ target }) {
    const { name } = target;
    if (target.checked) {
      setTextInput([
        ...textInput,
        name,
      ]);
    }
  }

  function getIngredients() {
    const ingredients = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    setRecipeIngredients(ingredients);
  }

  useEffect(() => {
    const toStorage = {
      [recipeId]: textInput,
    };
    if (textInput.length > 0) {
      localStorage.setItem(key, JSON.stringify(toStorage));
    }
  }, [textInput, recipeId]);

  useEffect(() => {
    setRecipeId(recipe.idMeal || recipe.idDrink);
  }, [recipeId, recipe.idMeal, recipe.idDrink]);

  useEffect(() => {
    getIngredients();
    getFromStorage();
  }, []);

  return (
    <div className="ingredients">

      {recipeIngredients && recipeIngredients.map(
        (ingredient, index) => (

          <div key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient[1] }

            >
              <input
                id={ ingredient[1] }
                type="checkbox"
                name={ `${ingredient[1]} ` }
                onChange={ handleInput }
                defaultChecked={
                  fromStorage
                   && fromStorage.some((value) => value.includes(ingredient[1]))
                }
              />
              <span>{ingredient[1]}</span>
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
