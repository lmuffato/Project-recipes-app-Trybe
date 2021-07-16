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
    <div>
      <input
        type="image"
        alt="share icon"
        onClick={ handleClick }
        src={ shareIcon }
        data-testid="share-btn"
      />
      {show ? <p>Link copiado!</p> : null}
    </div>
  );
}

ShareButton.propTypes = {
  urlCopied: PropTypes.string.isRequired,
};
