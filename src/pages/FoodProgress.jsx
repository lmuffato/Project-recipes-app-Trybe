import React from 'react';
import useRecipeProgress from '../hooks/useRecipeProgress';

export default function FoodProgress() {
  const {
    recipeProgress,
    showClipBoardMsg,
    blackHeartIcon,
    whiteHeartIcon,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToProgressPage,
    sendToLocalStorage,
  } = useRecipeProgress('meal');
  const recipeMeal = recipeProgress.meals[0];
  const { strCategory, strInstructions, strMeal, strMealThumb } = recipeMeal;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);

  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
  };

  const styledChecked = {
    textDecoration: 'dashed',
  };

  return (
    <main>
      <section>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
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

        <p data-testid="recipe-category">{strCategory}</p>
      </section>

      <section>
        <section>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li data-testid={ `${index}-ingredient-step` } key={ index }>
                <input
                  type="checkbox"
                  value={ ingredient }
                  onChange={ sendToLocalStorage }
                />
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
