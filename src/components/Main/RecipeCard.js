import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../style/RecipeCard.css';

export default function RecipeCard({ recipe, index, type }) {
  return (
    <div className="recipe-card">
      <Link
        to={
          type === '/comidas'
            ? `/comidas/${recipe.idMeal}`
            : `/bebidas/${recipe.idDrink}`
        }
      >
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ type === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="thumbnail recipe"
            width="100"
          />
          <p data-testid={ `${index}-card-name` }>
            { type === '/comidas' ? recipe.strMeal : recipe.strDrink }
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