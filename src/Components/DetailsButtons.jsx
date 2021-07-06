import React from 'react';
import shareBtnImg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function DetailsButtons() {
  const [isCopy, setIsCopy] = React.useState(false);
  const [isAFavorite, setFavorite] = React.useState(false);

  const handleClickFavorite = () => {
    setFavorite(!isAFavorite);
  };

  const handleClickShare = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickFavorite }
      >
        <img src={ isAFavorite ? blackHeart : whiteHeart } alt="Favorite button" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickShare }
      >
        <img src={ shareBtnImg } alt="Share button" />
        { isCopy && <h4>Link copiado!</h4> }
      </button>
    </div>
  );
}

export default DetailsButtons;
