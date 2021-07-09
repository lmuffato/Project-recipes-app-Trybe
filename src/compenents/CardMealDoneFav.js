import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardMealDoneFav({ recepie }, index) {
  console.log(recepie);
  const { id, name, image, category, area, doneDate, tags } = recepie;

  function copyLink() {
    const linkToCopy = `/comidas/${id}`;
    copy(linkToCopy);
    global.alert('Link copiado!');
  }

  return (
    <div>
      <Link to={ `/comidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          width="50px"
          alt="the food recepie"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text>` }>{ category }</p>
      <p>{ area }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <p
        data-testid={ `${index}-${tags}-horizontal-tag` }
      >
        { `${tags[0]}, ${tags[1]}` }
      </p>
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
    </div>
  );
}

CardMealDoneFav.propTypes = {
  recepie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CardMealDoneFav;
