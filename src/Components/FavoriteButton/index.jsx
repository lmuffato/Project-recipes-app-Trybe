import React, { useState } from 'react';

import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const saveFavoriteButton = () => {
    if (!isFavorite) {
      setIsFavorite(true);
    }
    if (isFavorite) {
      setIsFavorite(false);
    }
  };

  return (
    <div>
      <input
        type="image"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite button"
        onClick={ saveFavoriteButton }
      />
    </div>
  );
}

export default FavoriteButton;
