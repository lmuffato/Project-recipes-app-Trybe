import React from 'react';
import { bool, func, string } from 'prop-types';

function Button({ dataTestid, name, type, disabled, onClick, className }) {
  return (
    <button
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
      type={ type === 'submit' ? 'submit' : 'button' }
      className={ className }
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  dataTestid: string,
  name: string.isRequired,
  type: string.isRequired,
  disabled: bool,
  onClick: func,
  className: string,
};

Button.defaultProps = {
  dataTestid: '',
  disabled: false,
  onClick: () => {},
  className: '',
};

export default Button;
