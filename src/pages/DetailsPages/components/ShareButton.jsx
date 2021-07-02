import React from 'react';
import shareIcon from '../../../images/shareIcon.svg';

const ShareButton = () => (
  <button
    type="button"
    onClick={ () => console.log('Compartilhar Receita!') }
  >
    <img src={ shareIcon } alt="share-button" data-testid="share-btn" />
  </button>
);

export default ShareButton;
