import React from 'react';
import favoriteIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton() {
  return (
    <div>
      <img
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="favoritar"
      />
    </div>
  );
}
