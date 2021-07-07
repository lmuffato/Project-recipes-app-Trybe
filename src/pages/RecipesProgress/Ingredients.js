import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Ingredients.css';

export default function Ingredients({ recipe }) {
  const [textInput, setTextInput] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const key = 'inProgressRecipes';

  function handleInput({ target }) {
    const { name } = target;
    if (target.checked) {
      setTextInput([
        ...textInput,
        name,
      ]);
    }
  }

  function getIdRecipe() {
    setRecipeId(recipe.idMeal || recipe.idDrink);
  }

  function getIngredients() {
    const ingredients = Object.entries(recipe)
      .filter((property) => property[0].includes('strIngredient') && property[1]);
    setRecipeIngredients(ingredients);
  }

  useEffect(() => {
    getIdRecipe();
  }, [recipeId]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ [recipeId]: textInput }));
  }, [recipeId, textInput]);

  useEffect(() => {
    getIngredients();
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
                onClick={ handleInput }
              />
              <span>{`${ingredient[1]} `}</span>
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
