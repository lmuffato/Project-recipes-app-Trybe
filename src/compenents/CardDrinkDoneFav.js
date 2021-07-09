import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDrinkDoneFav({ recepie }, index) {
  const { id, name, image, doneDate, alcoholicOrNot } = recepie;

  function copyLink() {
    const linkToCopy = `/bebidas/${id}`;
    copy(linkToCopy);
    global.alert('Link copiado!');
  }

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
        <p>{alcoholicOrNot}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <button
          type="button"
          onClick={ () => copyLink() }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ Share }
            alt="share"
          />
        </button>
      </Link>
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
