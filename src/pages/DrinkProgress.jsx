import React from 'react';
import useRecipeProgress from '../hooks/useRecipeProgress';

export default function DrinkProgress() {
  const { recipeProgress,
    showClipBoardMsg,
    blackHeartIcon,
    whiteHeartIcon,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToProgressPage,
  } = useRecipeProgress('drink');
  const recipeDrink = recipeProgress.drinks[0];
  const { strAlcoholic, strInstructions, strDrink, strDrinkThumb } = recipeDrink;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDrink);
  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
  };

  return (
    <main>
      <section>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Recipe" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <button type="button" data-testid="share-btn">
          Share button
        </button>

        <button type="button">
          <img
            data-testid="favorite-btn"
            src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
          />
        </button>

        {showClipBoardMsg && renderClipBoardMsg()}

        <p data-testid="recipe-category">{strAlcoholic}</p>
      </section>

      <section>
        <section>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li data-testid={ `${index}-ingredient-step` } key={ index }>
                <input type="checkbox" />
                {`${ingredient} - ${measures[index]}`}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </section>
      </section>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        style={ styleFooter }
        onClick={ redirectToProgressPage }
      >
        Finalizar Receita
      </button>
    </main>
  );
}
