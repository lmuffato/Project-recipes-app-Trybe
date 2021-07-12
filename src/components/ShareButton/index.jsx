import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ dataTestId, urlCopied }) {
  const [copy, setCopy] = useState('hidden');

  function handleClick() {
    navigator.clipboard.writeText(urlCopied);
    setCopy('');
  }

  return (
    <div>
      <button
        type="button"
        src={ shareIcon }
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ dataTestId }
        />
      </button>
      <p className={ copy }>Link copiado!</p>
    </div>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  urlCopied: PropTypes.string.isRequired,
};
