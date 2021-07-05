import { arrayOf, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import CarouselCard from './CarouselCard';
import '../../styles/carousel.css';

function divide(dividend, divisor) {
  if (dividend > divisor) return divide((dividend - divisor), divisor);
  if (dividend < 0) return divide((dividend + divisor), divisor);
  return dividend % divisor;
}

function Carousel({ items }) {
  // TODO descobrir porque items está chegando undefined
  const [position, setPosition] = useState(0);
  const [leftItem, setLeftItem] = useState({});
  const [rightItem, setRightItem] = useState({});
  useEffect(() => {
    setLeftItem(divide(position, items.length));
    setRightItem(divide(position + 1, items.length));
  }, [items, position]);
  return (
    <div className="carousel-container">
      <button
        type="button"
        className="carousel-previous"
        onClick={ () => setPosition(position - 1) }
      >
        {'<'}
      </button>
      <div className="carousel-frame">
        {items.map(({ strDrink, strAlcoholic, strDrinkThumb }, index) => (
          <CarouselCard
            key={ strDrink }
            title={ strDrink }
            alcoholic={ strAlcoholic }
            link={ strDrinkThumb }
            index={ index }
            isVisible={ index === leftItem || index === rightItem }
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-next"
        onClick={ () => setPosition(position + 1) }
      >
        {'>'}
      </button>
    </div>
  );
}

Carousel.propTypes = {
  items: arrayOf(shape({})).isRequired,
};

export default Carousel;
