import React from 'react';
import PropTypes from 'prop-types';
import { handleNext, handlePrev } from './handleCarousel';

export default function CarouselBtn({ direction, recommended }) {
  return (
    <div>
      <button
        type="button"
        className="carrousel-btn"
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
  recommended: PropTypes.shape(PropTypes.string).isRequired,
};
