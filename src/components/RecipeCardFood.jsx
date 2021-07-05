import React from 'react';

export default function RecipeCardFood({ meal: { strMeal, strMealThumb }, index }) {
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
        { strMeal }
      </p>
      <img
        style={ { width: '80vw' } }
        src={ strMealThumb }
        alt=""
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}
