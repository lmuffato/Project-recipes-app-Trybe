import { arrayOf, shape } from 'prop-types';
import React from 'react';
import Carousel from './Carousel';

function Recomendations({ list }) {
  const CAROUSEL_TOTAL_ITEMS = 6;
  return (
    <Carousel
      items={ list
        .filter((_, index) => index < CAROUSEL_TOTAL_ITEMS) }
    />
  );
}

Recomendations.propTypes = {
  list: arrayOf(shape({})).isRequired,
};

export default Recomendations;
