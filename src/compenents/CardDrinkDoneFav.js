import React from 'react';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function CardDrinkDoneFav(recepie, index) {
  const { id, image, doneDate, alcoholicOrNot } = recepie;
  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="the recepie drink"
          src={ image }
        />
        <p>{alcoholicOrNot}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <img data-testid={ `${index}-horizontal-share-btn` } src={ Share } alt="share" />
      </Link>
    </div>
  );
}

export default CardDrinkDoneFav;
