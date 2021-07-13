import React from 'react';
import PropTypes from 'prop-types';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselCard({ card, alt }) {
  return (
    <img
      src={ `${card}` }
      alt={ `${alt}` }
    />
  );
}

CarouselCard.propTypes = {
  card: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
