import React from 'react';

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
    </div>
  );
}

export default DrinkCard;
