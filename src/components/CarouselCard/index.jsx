import React from 'react';
import { string } from 'prop-types';

export default function CarouselCard({ cardImg, cardTitle, cardCategory, index }) {
  return (
    <section data-testid={ `${index}-recomendation-card` }>
      <img src={ cardImg } alt="Recommended sides" />
      <p>{cardCategory}</p>
      <h1 data-testid={ `${index}-recomendation-title` }>{cardTitle}</h1>
    </section>
  );
}

CarouselCard.propTypes = {
  cardImg: string,
  cardTitle: string,
  cardCategory: string,
}.isRequired;
