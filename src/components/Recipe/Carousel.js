import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel';

import CarouselCard from './CarouselCard';

function Carousel({ items }) {
  return (
    <ReactResponsiveCarousel infiniteLoop>
      {items.map(({ title, alcoholic, imgLink }, index) => (
        <CarouselCard
          key={ title }
          title={ title }
          alcoholic={ alcoholic }
          link={ imgLink }
          index={ index }
        />
      ))}
    </ReactResponsiveCarousel>
  );
}

Carousel.propTypes = {
  items: arrayOf(shape({})).isRequired,
};

export default Carousel;
