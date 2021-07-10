import React from 'react';
import PropTypes from 'prop-types';
import { handleNext, handlePrev } from './handleCarousel';

export default function CarouselBtn({ direction, recommended }) {
  return (
    <div>
      <button
        type="button"
        onClick={
          () => (direction === 'next' ? handleNext(recommended) : handlePrev())
        }
      >
        {direction === 'next' ? '>' : '<'}
      </button>
    </div>
  );
}

CarouselBtn.propTypes = {
  direction: PropTypes.string.isRequired,
  recommended: PropTypes.objectOf(PropTypes.string).isRequired,
};
