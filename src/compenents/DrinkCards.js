import React from 'react';
// import histo
import PropTypes from 'prop-types';

function DrinkCards({ data, index }) {
  // history
  // console.log(data);
  const { strDrinkThumb, strDrink } = data;
  return (
    <div className="recipe" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt="Drink"
        className="recipe-image"
      />
      <p className="recipe-title" data-testid={ `${index}-card-name` }>{strDrink}</p>
    </div>
  );
}

DrinkCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default DrinkCards;
