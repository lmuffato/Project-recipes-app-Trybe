import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard(props) {
  const { index, drinks } = props;
  console.log(drinks);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        alt={ drinks.strDrink }
        src={ drinks.strDrinkThumb }
      />
      <p data-testid={ `${index}-card-name` }>{ drinks.strDrink }</p>
      { console.log(drinks)}
      { console.log('olá')}
    </div>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.string,
  drinks: PropTypes.object,
}.isRequired;

export default DrinkCard;
