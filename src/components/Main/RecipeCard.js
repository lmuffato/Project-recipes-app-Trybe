import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../style/RecipeCard.css';
import zipName from './Helpers';
import FoodContext from '../../contexts/FoodContext';

export default function RecipeCard({ recipe, index, type: URL_PATH }) {
  const context = useContext(FoodContext);
  const { color: { colorDiv } } = context;
  const { color: { colorP } } = context;
  const numOfCharacters = 25;

  return (
    <div
      className="recipe-card"
      style={ { backgroundColor: colorDiv } }
    >
      <Link
        to={
          URL_PATH === '/comidas' || URL_PATH === '/comidas/'
            ? `/comidas/${recipe.idMeal}`
            : `/bebidas/${recipe.idDrink}`
        }
      >
        <div
          data-testid={ `${index}-recipe-card` }
          style={ { backgroundColor: colorDiv } }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ URL_PATH === '/comidas' || URL_PATH === '/comidas/'
              ? recipe.strMealThumb
              : recipe.strDrinkThumb }
            alt="thumbnail recipe"
            width="100"
          />
          <p
            data-testid={ `${index}-card-name` }
            style={ { color: colorP } }
          >
            { URL_PATH === '/comidas' || URL_PATH === '/comidas/'
              ? zipName(recipe.strMeal, numOfCharacters)
              : zipName(recipe.strDrink, numOfCharacters) }
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
