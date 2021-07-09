import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index, type }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <li>
        <Link
          to={
            type === '/comidas'
              ? `/comidas/${recipe.idMeal}`
              : `/bebidas/${recipe.idDrink}`
          }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ type === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="thumbnail recipe"
            width="100"
          />
          <p data-testid={ `${index}-card-name` }>
            { type === '/comidas' ? recipe.strMeal : recipe.strDrink }
          </p>
        </Link>
      </li>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
