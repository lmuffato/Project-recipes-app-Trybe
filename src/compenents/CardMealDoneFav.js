import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function CardMealDoneFav({ recepie }, index) {
  console.log(recepie);
  const { id, name, image, category, area, doneDate, tags } = recepie;

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
      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
      <p>{ area }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <p
        data-testid={ `${index}-${tags}-horizontal-tag` }
      >
        { `${tags[0]}, ${tags[1]}` }
      </p>
      <ShareButton
        idRecipe={ `comidas/${id}` }
      />
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
