import React from 'react';

export default function RenderIngredients(ingredients) {
  const LIMIT = 12;
  if (ingredients) {
    return (
      ingredients.map((e, index) => index < LIMIT && (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
            alt={ e.strIngredient1 }
          />
          <span data-testid={ `${index}-card-name` }>{e.strIngredient1}</span>
        </div>
      ))
    );
  }
}
