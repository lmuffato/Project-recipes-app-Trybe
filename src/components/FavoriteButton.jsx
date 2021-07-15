// import { Button } from 'bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import RecipeFav from '../effects/RecipeFav';
import favoriteWhiteIcon from '../images/whiteHeartIcon.svg';
import favoriteBlackIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ recipe }) {
  const [fav, setFav] = useState(false);
  const [shouldColor, setShouldColor] = useState(false);

  RecipeFav(recipe, fav, setShouldColor, shouldColor);

  const handleClick = () => {
    if (!fav) {
      setFav(true);
    } else {
      setFav(false);
    }
  };
  return (
    <div>
      <Image
        className={ shouldColor && 'fillFavoriteButton' }
        style={ { width: '2rem' } }
        data-testid="favorite-btn"
        src={ shouldColor ? favoriteBlackIcon : favoriteWhiteIcon }
        alt="favoritar"
        onClick={ handleClick }
      />
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.obj,
}.isRequired;
