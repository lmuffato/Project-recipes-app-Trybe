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

export default function FoodProgress() {
  const {
    recipeProgress,
    showClipBoardMsg,
    recipeDoneCheck,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    checkFavorite,
    redirectToRecipeDonePage,
    sendToLocalStorage,
    isChecked,
    setHeart,
    copyToClipBoard,
    renderLoading,
  } = useRecipeProgress('meal');
  const recipeMeal = recipeProgress.meals[0];
  const { strCategory, strInstructions, strMeal, strMealThumb } = recipeMeal;
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);

  const styledChecked = {
    textDecoration: 'line-through',
  };

  const FoodProgressComponent = () => (
    <MainContainerDetails>
      <ContainerFood>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe" />
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyToClipBoard }
          >
            <BiShareAlt />
          </button>

          <button type="button" onClick={ () => setHeart(recipeMeal) }>
            {checkFavorite() ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        {showClipBoardMsg && renderClipBoardMsg()}

        <h2 data-testid="recipe-category">{strCategory}</h2>
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
        onClick={ () => redirectToRecipeDonePage(recipeMeal) }
        disabled={ !recipeDoneCheck(ingredients) }
      >
        Finalizar Receita
      </ButtonDetails>
    </MainContainerDetails>
  );

  return renderLoading(FoodProgressComponent());
}
