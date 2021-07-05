import React from 'react';
import PropTypes from 'prop-types';

function MealCard({ data, index }) {
  console.log(data);
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

MealCard.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default MealCard;
