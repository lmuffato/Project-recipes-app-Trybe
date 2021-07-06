import React from 'react';
import PropTypes from 'prop-types';

function RecomendedMeals({ recommendationId, mealImg, mealName, mealTitleId }) {
  return (
    <div data-testid={ recommendationId } className="carousel-card">
      <img src={ mealImg } alt="Recomended drink" />
      <h3 data-testid={ mealTitleId }>{ mealName }</h3>
    </div>
  );
}

RecomendedMeals.propTypes = {
  recommendationId: PropTypes.string,
  mealImg: PropTypes.string,
  mealName: PropTypes.string,
  mealTitleId: PropTypes.string,
}.isRequired;

export default RecomendedMeals;
