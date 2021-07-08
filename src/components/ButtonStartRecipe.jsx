import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function ButtonStartRecipe({ buttonText, type, id }) {
  const history = useHistory();
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-recipe-btn"
      id="start-recipe-btn"
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      {buttonText}
    </button>
  );
}

ButtonStartRecipe.propTypes = {
  buttonText: PropTypes.string,
}.isRequired;

export default ButtonStartRecipe;
