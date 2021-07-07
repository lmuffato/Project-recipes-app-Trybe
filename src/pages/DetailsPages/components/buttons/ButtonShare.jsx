import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import shareIcon from '../../../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonShare() {
  const shareUrl = (e) => {
    e.preventDefault();
    copy(window.location.href);
    document.getElementById('shareButton').innerText = 'Link copiado!';
  };

  return (
    <button
      id="shareButton"
      type="button"
      onClick={ (e) => shareUrl(e) }
    >
      <img alt="share-button" src={ shareIcon } data-testid="share-btn" />
    </button>
  );
}

ButtonShare.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default ButtonShare;
