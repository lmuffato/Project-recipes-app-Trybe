import React from 'react';

export default function RenderIngredients(ingredients) {
  const LIMIT = 12;
  if (ingredients) {
    return (
      ingredients.map((e, index) => index < LIMIT && (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
            alt={ e.strIngredient }
          />
          <span data-testid={ `${index}-card-name` }>{e.strIngredient}</span>
        </div>
      ))
    );
  }
}
