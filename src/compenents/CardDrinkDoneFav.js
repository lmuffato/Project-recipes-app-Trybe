import React from 'react';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

function CardDrinkDoneFav(id, index, image, alcoholicOrNot, doneDate) {
  return (
    <div>
      <Link to={`/bebidas/${id}`}>
        <img data-testid={`${index}-horizontal-image`}>{ image }</img>
        <p>alcólica:{alcoholicOrNot}</p> 
        <p data-testid={`${index}-horizontal-done-date`}>{doneDate}</p>
        <img data-testid={`${index}-horizontal-share-btn`} src={Share} alt="share"></img>
      </Link>
    </div>
  )
}

export default CardDrinkDoneFav;
