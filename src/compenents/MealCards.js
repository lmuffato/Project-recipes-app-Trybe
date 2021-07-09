import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/MainRecipes.css';

function MealCards({ data, index }) {
  const { idMeal, strMealThumb, strMeal } = data;
  return (
    <Link
      to={ `/comidas/${idMeal}` }
      className="recipe"
      data-testid={ `${index}-recipe-card` }
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
}

MealCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default MealCards;
