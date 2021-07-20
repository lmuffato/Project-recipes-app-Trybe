import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../style/RecipeCard.css';

export default function RecipeCard({ recipe, index, type: URL_PATH }) {
  return (
    <div className="recipe-card">
      <Link
        to={
          URL_PATH === '/comidas' || URL_PATH === '/comidas/'
            ? `/comidas/${recipe.idMeal}`
            : `/bebidas/${recipe.idDrink}`
        }
      >
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ URL_PATH === '/comidas' || URL_PATH === '/comidas/'
              ? recipe.strMealThumb
              : recipe.strDrinkThumb }
            alt="thumbnail recipe"
            width="100"
          />
          <p data-testid={ `${index}-card-name` }>
            { URL_PATH === '/comidas' || URL_PATH === '/comidas/'
              ? recipe.strMeal
              : recipe.strDrink }
          </p>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
