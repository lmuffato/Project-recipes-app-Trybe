import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD

function MealCards({ data, index }) {
  const { strMealThumb, strMeal } = data;
  return (
    <div className="recipe" data-testid={ `${index}-recipe-card` }>
=======
import { Link } from 'react-router-dom';

function MealCards({ data, index }) {
  const { idMeal, strMealThumb, strMeal } = data;
  return (
    <Link
      to={ `/comidas/${idMeal}` }
      className="recipe"
      data-testid={ `${index}-recipe-card` }
    >
>>>>>>> b2e4ddb7360ba0d39f6cee355582cc4e135476a9
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt="Meal"
        className="recipe-image"
      />
      <p className="recipe-title" data-testid={ `${index}-card-name` }>{strMeal}</p>
<<<<<<< HEAD
    </div>
=======
    </Link>
>>>>>>> b2e4ddb7360ba0d39f6cee355582cc4e135476a9
  );
}

MealCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default MealCards;
