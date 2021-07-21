import React from 'react';
import loadingGif from '../images/loading.gif';

export default function LoadingScreen() {
  return (
    <div>
      <img src={ loadingGif } alt="loading-gif" />
    </div>
  );
}
