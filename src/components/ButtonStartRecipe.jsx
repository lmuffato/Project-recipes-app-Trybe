import React from 'react';
import PropTypes from 'prop-types';

function ButtonStartRecipe({ buttonText }) {
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-recipe-btn"
      id="start-recipe-btn"
    >
      {buttonText}
    </button>
  );
}

ButtonStartRecipe.propTypes = {
  buttonText: PropTypes.string,
}.isRequired;

export default ButtonStartRecipe;
