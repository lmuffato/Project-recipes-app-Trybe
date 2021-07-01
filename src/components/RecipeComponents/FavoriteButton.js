import React, { useContext } from 'react';
import isFavorite from '../../images/blackHeartIcon.svg';
import isNotFavorite from '../../images/whiteHeartIcon.svg';
import ReceitasContext from '../../contexts/ReceitasContext';

export default function FavBtn() {
  const { favorite, setFavorite } = useContext(ReceitasContext);
  const handleClick = () => {
    setFavorite(!favorite);
  };
  const imageProvider = () => (
    favorite === true
      ? isFavorite
      : isNotFavorite
  );
  return (
    <input
      type="image"
      data-testid="favorite-btn"
      variant="light"
      style={ { height: '28px' } }
      onClick={ handleClick }
      src={ imageProvider() }
      alt="isFavorite"
    />
  );
}
