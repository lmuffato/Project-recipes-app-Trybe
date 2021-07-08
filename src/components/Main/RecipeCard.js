import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index, type }) {
  const { pathname } = useLocation();
  console.log(recipe);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      { (pathname === '/comidas')
        ? (
          <Link to={ `/comidas/${recipe.idMeal}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ type === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt="thumbnail recipe"
              width="100"
            />
            <p data-testid={ `${index}-card-name` }>
              { type === '/comidas' ? recipe.strMeal : recipe.strDrink }
            </p>
          </Link>)
        : (
          <Link to={ `/bebidas/${recipe.idDrink}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ type === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt="thumbnail recipe"
              width="100"
            />
            <p data-testid={ `${index}-card-name` }>
              { type === '/comidas' ? recipe.strMeal : recipe.strDrink }
            </p>
          </Link>)}
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
