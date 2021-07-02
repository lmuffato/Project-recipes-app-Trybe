import React from 'react';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

const FavButton = () => (
  <button type="button">
    <img alt="black-heart" src={ blackHeartIcon } data-testid="favorite-btn" />
  </button>
);

export default FavButton;
