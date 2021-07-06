import React from 'react';
// import histo
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCards({ data, index }) {
  console.log(data);
  const { idDrink, strDrinkThumb, strDrink } = data;
  return (
    <Link
      to={ `/bebidas/${idDrink}` }
      className="recipe"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt="Drink"
        className="recipe-image"
      />
      <p className="recipe-title" data-testid={ `${index}-card-name` }>{strDrink}</p>
    </Link>
  );
}

DrinkCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default DrinkCards;
