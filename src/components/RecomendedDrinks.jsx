import React from 'react';
import PropTypes from 'prop-types';

function RecomendedDrinks({ recommendationId, drinkImg, drinkName, drinkTitleId }) {
  return (
    <div data-testid={ recommendationId } className="carousel-card">
      <img src={ drinkImg } alt="Recomended drink" />
      <h3 data-testid={ drinkTitleId }>{ drinkName }</h3>
    </div>
  );
}

RecomendedDrinks.propTypes = {
  recommendationId: PropTypes.string,
  drinkImg: PropTypes.string,
  drinkName: PropTypes.string,
  drinkTitleId: PropTypes.string,
}.isRequired;

export default RecomendedDrinks;
