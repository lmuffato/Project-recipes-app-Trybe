import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

export default function useCarousel(recipes, type) {
  const [index, setIndex] = useState(0);
  const mealOrDrink = type === 'drink' ? 'Drink' : 'Meal';

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderCarouselCards = () => (
    <Carousel activeIndex={ index } onSelect={ handleSelect }>
      {recipes.map((rec) => (
        <Carousel.Item key={ rec[`str${mealOrDrink}`] }>
          <img
            className="d-block w-100"
            src={ rec[`str${mealOrDrink}Thumb`] }
            alt={ rec[`str${mealOrDrink}`] }
          />
          <Carousel.Caption>
            <span>{rec[`str${mealOrDrink}`]}</span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return { renderCarouselCards };
}
