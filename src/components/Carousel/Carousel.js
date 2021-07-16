import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CarouselCard from './CarouselCard';

export default function Carousel({ data }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider { ...settings }>
      { data !== undefined && data.map((card, index) => (
        <div
          // style={ { width: 100, height: 100 } }
          className="recomendation-cards"
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <CarouselCard
            card={ card[0] }
            alt="image recipe"
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            { card[1] }
          </p>
        </div>
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
