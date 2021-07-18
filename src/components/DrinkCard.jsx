import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ mealName, mealImg, testImgId, testNameId, testCardId, mealId }) {
  return (
    <Link to={ `/bebidas/${mealId}` }>
      <div data-testid={ testCardId } className="itemCard">
        <img
          src={ mealImg }
          alt={ mealName }
          data-testid={ testImgId }
          className="imgRecipes"
        />
        <h4 data-testid={ testNameId }>{mealName}</h4>
      </div>
    </Link>
  );
}

DrinkCard.propTypes = {
  mealName: PropTypes.string,
  mealImg: PropTypes.string,
  testImgId: PropTypes.string,
  testNameId: PropTypes.string,
  testCardId: PropTypes.string,
  mealId: PropTypes.string,
}.isRequired;

export default DrinkCard;
