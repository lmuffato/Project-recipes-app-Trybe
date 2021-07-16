import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, dataTestid, onClick }) {
  return (
    <button
      data-testid={ `${dataTestid}` }
      type="button"
      onClick={ onClick }
      style={ { position: 'fixed', bottom: '0px' } }
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
