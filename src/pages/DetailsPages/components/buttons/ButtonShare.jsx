import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import shareIcon from '../../../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonShare() {
  const shareUrl = (e) => {
    e.preventDefault();
    let url = window.location.href;
    // removendo "in-progress" do final do link, se houver
    url = url.replace('/in-progress', '');
    // console.log(url);
    copy(url);
    document.getElementById('shareButton').innerText = 'Link copiado!';
  };

  return (
    <button
      id="shareButton"
      type="button"
      className="svg-btn"
      onClick={ (e) => shareUrl(e) }
    >
      <img
        alt="share-button"
        src={ shareIcon }
        data-testid="share-btn"
        className="altSvg"
      />
    </button>
  );
}

ButtonShare.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default ButtonShare;
