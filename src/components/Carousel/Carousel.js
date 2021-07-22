import React, { useContext } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import CarouselCard from './CarouselCard';

export default function Carousel({ data }) {
  const context = useContext(FoodContext);
  const { color: { colorP } } = context;
  const { color: { colorDiv } } = context;

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
          style={ { backgroundColor: colorDiv } }
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
            style={ { color: colorP } }
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
