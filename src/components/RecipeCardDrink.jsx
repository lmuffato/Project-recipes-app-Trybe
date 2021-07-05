import React from 'react';

export default function RecipeCardDrink({ drink: { strDrink, strDrinkThumb }, index }) {
  return (
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
  );
}
