import React from 'react';
import { number, string } from 'prop-types';

import '../../styles/carouselCard.css';

function CarouselCard({ title, alcoholic, link, index, isVisible }) {
  const visibility = isVisible ? 'carousel-card-show' : 'carousel-card-hidden';
  return (
    <div
      className={ `carousel-card-frame ${visibility}` }
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        className="carousel-card-img"
        width="50"
        src={ link }
        alt={ `Bebida recomendada: ${title}` }
      />
      <h3 className="carousel-card-alcoholic">{alcoholic}</h3>
      <h2
        className="carousel-card-name"
        data-testid={ `${index}-recomendation-title` }
      >
        {title}
      </h2>
    </div>
  );
}

CarouselCard.propTypes = {
  title: string,
  alcoholic: string,
  link: string,
  index: number,
}.isRequired;

export default CarouselCard;
