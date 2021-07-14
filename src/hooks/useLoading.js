import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loading-lottie.json';

export default function useLoading() {
  const [loading, setLoading] = useState(false);
  const [isStopped] = useState(false);
  const [isPaused] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const renderLoading = (Component) => {
    if (loading) {
      return (
        <div style={ { margin: '5.8rem 6.7rem' } }>
          <Lottie
            options={ defaultOptions }
            height={ 150 }
            width={ 150 }
            isStopped={ isStopped }
            isPaused={ isPaused }
          />
        </div>
      );
    }
    return Component;
  };

  return { loading, setLoading, renderLoading };
}
