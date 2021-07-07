import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, dataTestid }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  dataTestid: PropTypes.string,
}.isRequired;

export default Button;
