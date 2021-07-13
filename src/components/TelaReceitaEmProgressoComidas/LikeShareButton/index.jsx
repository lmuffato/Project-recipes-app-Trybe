import React from 'react';
import WhiteHeart from '../../../images/whiteHeartIcon.svg';
import ShareIcon from '../../../images/shareIcon.svg';
import styles from './styles.module.scss';

function LikeShareButton() {
  return (
    <div className={ styles.likesharecontainer }>
      <button type="button">
        <img src={ WhiteHeart } alt="black heart icon" data-testid="favorite-btn" />
      </button>
      <button type="button" data-testid="share-btn">
        <img src={ ShareIcon } alt="share icon" />
      </button>
    </div>
  );
}

export default LikeShareButton;
