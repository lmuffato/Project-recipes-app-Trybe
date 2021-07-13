import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CarouselCard from './CarouselCard';

export default function Carousel({ data }) {
  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider { ...settings }>
        { data.length > 0 && data.map((card, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <CarouselCard
              card={ card }
              alt="image recipe"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
