import React from 'react';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function CardDrinkDoneFav(recepie, index) {
  const { id, name, image, doneDate, alcoholicOrNot } = recepie.recepie;
  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="the recepie drink"
          width='50px'
          src={ image }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p>{alcoholicOrNot}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <img data-testid={ `${index}-horizontal-share-btn` } src={ Share } alt="share" />
      </Link>
    </div>
  );
}

export default CardDrinkDoneFav;
