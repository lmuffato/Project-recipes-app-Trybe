import React from 'react';
import PropTypes from 'prop-types';

function MealCard({ mealName, mealImg, testImgId, testNameId, testCardId }) {
  return (
    <div data-testid={ testCardId }>
      <img src={ mealImg } alt={ mealName } data-testid={ testImgId } />
      <h3 data-testId={ testNameId }>{mealName}</h3>
    </div>
  );
}

MealCard.propTypes = {
  mealName: PropTypes.string,
  mealImg: PropTypes.string,
  testImgId: PropTypes.string,
  testNameId: PropTypes.string,
  testCardId: PropTypes.string,
}.isRequired;

export default MealCard;
