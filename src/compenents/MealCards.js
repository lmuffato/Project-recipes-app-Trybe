import React from 'react';
import PropTypes from 'prop-types';

function MealCards({ data, index }) {
  const { strMealThumb, strMeal } = data;
  return (
    <div className="recipe" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt="Meal"
        className="recipe-image"
      />
      <p className="recipe-title" data-testid={ `${index}-card-name` }>{strMeal}</p>
    </div>
  );
}

MealCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default MealCards;