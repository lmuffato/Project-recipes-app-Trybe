import React from 'react';
import { number, string } from 'prop-types';

import '../../styles/carouselCard.css';

function CarouselCard({ title, alcoholic, link, index }) {
  return (
    <div>
      <img
        className="carousel-img"
        data-testid={ `${index}-recomendation-card` }
        src={ link }
        alt={ `Bebida recomendada: ${title}` }
      />
      <h5>{alcoholic}</h5>
      <p
        data-testid={ `${index}-recomendation-title` }
      >
        {title}
      </p>
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
