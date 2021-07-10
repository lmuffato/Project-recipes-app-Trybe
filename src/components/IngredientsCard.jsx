import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ index, ingredientImg, ingredientName }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img src={ ingredientImg } data-testid={ `${index}-card-img` } alt="ingredient" />
      <h4 data-testid={ `${index}-card-name` }>{ ingredientName }</h4>
    </div>
  );
}

IngredientsCard.propTypes = {
  index: PropTypes.string,
  ingredientImg: PropTypes.string,
  ingredientName: PropTypes.string,
}.isRequired;

export default IngredientsCard;
