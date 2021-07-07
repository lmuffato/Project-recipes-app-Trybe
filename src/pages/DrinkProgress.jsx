import React from 'react';
import useRecipeProgress from '../hooks/useRecipeProgress';

export default function DrinkProgress() {
  const {
    recipeProgress,
    showClipBoardMsg,
    blackHeartIcon,
    whiteHeartIcon,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToRecipeDonePage,
    sendToLocalStorage,
    isChecked,
    setHeart,
    copyToClipBoard,
    recipeDoneCheck,
  } = useRecipeProgress('drink');
  const recipeDrink = recipeProgress.drinks[0];
  const { strAlcoholic, strInstructions, strDrink, strDrinkThumb } = recipeDrink;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDrink);

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
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Recipe" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
          Share button
        </button>

        <button type="button" onClick={ () => setHeart(recipeDrink) }>
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
        onClick={ () => redirectToRecipeDonePage(recipeDrink) }
        disabled={ !recipeDoneCheck(ingredients) }
      >
        Finalizar Receita
      </button>
    </main>
  );
}
