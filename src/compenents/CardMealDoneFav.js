import React from 'react';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function CardMealDoneFav(recepie, index) {
  const { id, name, image, category, area, doneDate, tags } = recepie;
  return (
    <div>
      <Link to={ `/comidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="the food recepie"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p data-testid={ `${index}-horizontal-top-text>` }>{ category }</p>
        <p>{ area }</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <p
          data-testid={ `${index}-${tags}-horizontal-tag` }
        >
          { `${tags[0]}, ${tags[1]}` }
        </p>
        <img data-testid={ `${index}-horizontal-share-btn` } src={ Share } alt="share" />
      </Link>
    </div>
  );
}

export default CardMealDoneFav;
