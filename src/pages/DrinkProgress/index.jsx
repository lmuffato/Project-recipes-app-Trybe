import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useRecipeProgress from '../../hooks/useRecipeProgress';
import {
  MainContainerDetails,
  ButtonDetails,
  ContainerFood,
  ContainerRecipes,
} from '../../styles/shared/Progress/ProgressStyles';

export default function DrinkProgress() {
  const {
    recipeProgress,
    showClipBoardMsg,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToRecipeDonePage,
    sendToLocalStorage,
    isChecked,
    setHeart,
    copyToClipBoard,
    recipeDoneCheck,
    renderLoading,
  } = useRecipeProgress('drink');
  const recipeDrink = recipeProgress.drinks[0];
  const { strAlcoholic, strInstructions, strDrink, strDrinkThumb } = recipeDrink;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDrink);

  const styledChecked = {
    textDecoration: 'line-through',
  };

  const DrinkProgressComponent = () => (
    <MainContainerDetails>
      <ContainerFood>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Recipe" />

        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyToClipBoard }
          >
            <BiShareAlt />
          </button>

          <button type="button" onClick={ () => setHeart(recipeDrink) }>
            {checkFavorite() ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        {showClipBoardMsg && renderClipBoardMsg()}

        <p data-testid="recipe-category">{strAlcoholic}</p>
      </ContainerFood>

      <ContainerRecipes>
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
      </ContainerRecipes>

      <ButtonDetails
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => redirectToRecipeDonePage(recipeDrink) }
        disabled={ !recipeDoneCheck(ingredients) }
      >
        Finalizar Receita
      </ButtonDetails>
    </MainContainerDetails>
  );

  return renderLoading(DrinkProgressComponent());
}
