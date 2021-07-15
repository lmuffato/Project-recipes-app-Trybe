import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/MainRecipes.css';

function MealCards({ data }) {
  // const { idMeal, strMealThumb, strMeal } = data;
  return (
    data.map((recipe, index) => {
      const { idMeal, strMealThumb, strMeal } = recipe;

      return (
        <Link
          to={ `/comidas/${idMeal}` }
          className="recipe"
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt="Meal"
            className="recipe-image"
          />
          <p className="recipe-title" data-testid={ `${index}-card-name` }>{strMeal}</p>

        </Link>
      );
    }));
}

MealCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default MealCards;
