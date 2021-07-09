import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ recipeId, isFood }) {
  function handleShareClick() {
    copy(`${window.location.origin}/${isFood ? 'comidas' : 'bebidas'}/${recipeId}`);

    const toast = document.createElement('p');
    toast.innerText = 'Link copiado!';
    toast.className = 'toast';
    document.getElementsByTagName('body')[0].appendChild(toast);
    const WAIT_TIME = 4000;
    setTimeout(() => {
      toast.remove();
    }, WAIT_TIME);
  }

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ handleShareClick }
    >
      <img src={ shareIcon } alt="compartilhar" />
    </button>
  );
}

ShareButton.propTypes = {
  recipeId: PropTypes.string,
  isFood: PropTypes.string,
  isDrink: PropTypes.string,
}.isRequired;
