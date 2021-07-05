import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecipeCardDrink({
  drink: {
    idDrink, strDrink, strDrinkThumb }, index }) {
  return (
    <Link to={ `/bebidas/${idDrink}` }>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          alignItems: 'center' } }
        data-testid={ `${index}-recipe-card` }
      >
        <p
          data-testid={ `${index}-card-name` }
        >
          { strDrink }
        </p>
        <img
          style={ { width: '80vw' } }
          src={ strDrinkThumb }
          alt=""
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

RecipeCardDrink.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
