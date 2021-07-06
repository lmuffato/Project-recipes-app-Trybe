import React from 'react';
import BlackHeart from '../../../images/blackHeartIcon.svg';
import ShareIcon from '../../../images/shareIcon.svg';
import './style.css';

function LikeShareButton() {
  return (
    <div className="like-share-container">
      <button type="button">
        <img src={ BlackHeart } alt="black heart icon" data-testid="favorite-btn" />
      </button>
      <button type="button" data-testid="share-btn">
        <img src={ ShareIcon } alt="share icon" />
      </button>
    </div>
  );
}

export default LikeShareButton;
