import { arrayOf, shape } from 'prop-types';
import React from 'react';
import ReactMultiCarousel from 'react-multi-carousel';

import CarouselCard from './CarouselCard';

function Carousel({ items }) {
  const responsive = {
    mobie: {
      breakpoint: { max: 4000, min: 0 },
      items: 2,
    },
  };
  return (
    <ReactMultiCarousel
      keyBoardControl
      showDots
      infinite
      responsive={ responsive }
    >
      {items.map(({ title, alcoholic, imgLink }, index) => (
        <CarouselCard
          key={ title }
          title={ title }
          alcoholic={ alcoholic }
          link={ imgLink }
          index={ index }
        />
      ))}
    </ReactMultiCarousel>
  );
}

Carousel.propTypes = {
  items: arrayOf(shape({})).isRequired,
};

export default Carousel;
