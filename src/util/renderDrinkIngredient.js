import React from 'react';
import '../PagesCss/DrinkIngredient.css';

const filter = (name) => {
  console.log(name);
};

export default function RenderIngredients(ingredients) {
  const LIMIT = 12;
  if (ingredients) {
    return (
      ingredients.map((e, index) => index < LIMIT && (
        <button
          type="button"
          key={ index }
          className="drink-ingredient-btn"
          onClick={ () => filter(e.strIngredient1) }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
              alt={ e.strIngredient1 }
            />
            <span data-testid={ `${index}-card-name` }>{e.strIngredient1}</span>
          </div>
        </button>
      ))
    );
  }
}
