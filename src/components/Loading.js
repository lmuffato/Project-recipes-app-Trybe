import React from 'react';
import chefCookingLoader from '../images/chefCookingLoader.GIF';
import './loading.css';

function Loading() {
  return (
    <div className="loading-page">
      <img
        src={ chefCookingLoader }
        className="loading-image-content"
      />
    </div>
  );
}

export default Loading;