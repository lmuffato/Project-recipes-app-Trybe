import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index, type }) {
  console.log(recipe.strMealThumb);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <li>
        <img
          data-testid={ `${index}-card-img` }
          src={ type === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="thumbnail recipe"
          width="100"
        />
        <p data-testid={ `${index}-card-name` }>
          { type === '/comidas' ? recipe.strMeal : recipe.strDrink }
        </p>
      </li>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
