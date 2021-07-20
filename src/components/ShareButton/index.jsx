import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ urlCopied }) {
  const [show, setCopy] = useState(false);

  function handleClick() {
    copy(urlCopied);
    setCopy(true);
  }

  return (
    <>
      <button type="button" onClick={ handleClick }>
        <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
      </button>
      {show ? <p className="share-message">Link copiado!</p> : null}
    </>
  );
}

ShareButton.propTypes = {
  urlCopied: PropTypes.string.isRequired,
};
