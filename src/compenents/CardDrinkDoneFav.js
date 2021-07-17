import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDrinkDoneFav({ recepie, index }) {
  const { id, name, image, doneDate, alcoholicOrNot } = recepie;
  const [isCopy, setIsCopy] = useState(null);

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    console.log(target);
    const { alt } = target;
    const path = `http://localhost:3000/bebidas/${alt}`;
    navigator.clipboard.writeText(path);
  };
  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="the recepie drink"
          width="50px"
          src={ image }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
      <Link to={ `/bebidas/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button
        type="button"
        onClick={ (event) => copyToClipboard(event) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ id }
        />
      </button>
      {isCopy ? <span>Link copiado!</span> : null}
    </div>
  );
}

CardDrinkDoneFav.propTypes = {
  index: PropTypes.number.isRequired,
  recepie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};

export default CardDrinkDoneFav;
