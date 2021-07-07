import React from 'react';
import useRecipeProgress from '../hooks/useRecipeProgress';

export default function FoodProgress() {
  const {
    recipeProgress,
    showClipBoardMsg,
    blackHeartIcon,
    whiteHeartIcon,
    recipeDoneCheck,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToRecipeDonePage,
    sendToLocalStorage,
    isChecked,
    setHeart,
    copyToClipBoard,
  } = useRecipeProgress('meal');
  const recipeMeal = recipeProgress.meals[0];
  const { strCategory, strInstructions, strMeal, strMealThumb } = recipeMeal;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);

  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
  };

  const styledChecked = {
    textDecoration: 'line-through',
  };

  return (
    <main>
      <section>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
          Share button
        </button>

        <button type="button" onClick={ () => setHeart(recipeMeal) }>
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
              <li
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                style={ isChecked(ingredient) ? styledChecked : {} }
              >
                <input
                  type="checkbox"
                  value={ ingredient }
                  onChange={ sendToLocalStorage }
                  checked={ isChecked(ingredient) }
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
        onClick={ () => redirectToRecipeDonePage(recipeMeal) }
        disabled={ !recipeDoneCheck(ingredients) }
      >
        Finalizar Receita
      </button>
    </main>
  );
}
