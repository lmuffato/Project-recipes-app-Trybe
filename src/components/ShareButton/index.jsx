import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function shareButton({ dataTestId, urlCopied }) {
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

shareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  urlCopied: PropTypes.string.isRequired,
};

export default shareButton;
