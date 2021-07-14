import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function CardDrinkDoneFav({ recepie }, index) {
  const { id, name, image, doneDate, alcoholicOrNot } = recepie;

  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="the recepie drink"
          width="50px"
          src={ image }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p>{alcoholicOrNot}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <ShareButton
        idRecipe={ `bebidas/${id}` }
      />
    </div>
  );
}

CardDrinkDoneFav.propTypes = {
  recepie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};

export default CardDrinkDoneFav;
