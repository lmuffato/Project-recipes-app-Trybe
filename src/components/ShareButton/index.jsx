import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ dataTestId, urlCopied }) {
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
        data-test-id={ dataTestId }
      />
      {show ? <p>Link copiado!</p> : null}
    </div>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  urlCopied: PropTypes.string.isRequired,
};
