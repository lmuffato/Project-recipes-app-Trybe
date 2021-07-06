import React from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';

export default function DrinkDetails() {
  const { recipe, getIngredientsAndMeasures } = useRecipeDetails('cocktail');
  const recipeDrink = recipe.drinks[0];
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDrink);
  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
  } = recipeDrink;

  return (
    <section>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="#" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <button type="button" data-testid="share-btn">
        Share button
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorite button
      </button>

      <section>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${ingredient} - ${measures[index]}`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </section>

      <div data-testid="0-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </section>
  );
}
