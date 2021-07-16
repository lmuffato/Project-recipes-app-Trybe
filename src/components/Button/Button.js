import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, dataTestid, onClick }) {
  return (
    <button
      className="button is-primary"
      data-testid={ `${dataTestid}` }
      type="button"
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
