import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Recommends.css';

export default function RecDrinkCard({
  drink: {
    idDrink, strDrink, strDrinkThumb, strAlcoholic }, index }) {
  return (
    <Link to={ `/bebidas/${idDrink}` }>
      <div className="recommendCard">
        <img
          className="recommendImg"
          src={ strDrinkThumb }
          alt=""
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-recomendation-card` }
        >
          { strAlcoholic }
        </p>
        <h3
          data-testid={ `${index}-recomendation-title` }
        >
          { strDrink }
        </h3>
      </div>
    </Link>
  );
}

RecDrinkCard.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
