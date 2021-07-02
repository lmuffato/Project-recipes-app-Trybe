import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard({ mealName, mealImg, testImgId, testNameId, testCardId }) {
  return (
    <div data-testid={ testCardId }>
      <img src={ mealImg } alt={ mealName } data-testid={ testImgId } />
      <h3 data-testid={ testNameId }>{mealName}</h3>
    </div>
  );
}

DrinkCard.propTypes = {
  mealName: PropTypes.string,
  mealImg: PropTypes.string,
  testImgId: PropTypes.string,
  testNameId: PropTypes.string,
  testCardId: PropTypes.string,
}.isRequired;

export default DrinkCard;
