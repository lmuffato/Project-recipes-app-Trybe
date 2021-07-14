import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useCarousel from '../../hooks/useCarousel';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import {
  ContainerFood,
  MainContainerDetails,
  ContainerRecipes,
  ContainerCarousel,
  ButtonDetails,
} from '../../styles/shared/Details/DetailsStyles';

export default function FoodDetails() {
  const {
    recipe,
    recommended,
    showClipBoardMsg,
    setHeart,
    getIngredientsAndMeasures,
    filterRecommended,
    redirectToProgressPage,
    copyToClipBoard,
    renderClipBoardMsg,
    checkFavorite,
    diplayNoneButton,
    verifyInProgressById,
    renderLoading,
  } = useRecipeDetails('meal');
  const { renderCarouselCards } = useCarousel(
    filterRecommended(recommended.drinks),
    'drink',
  );
  const recipeMeal = recipe.meals[0];
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipeMeal;

  const FoodDetailsComponent = () => (
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
            <BiShareAlt alt="Share" />
          </button>

          <button type="button" onClick={ () => setHeart(recipeMeal) }>
            {checkFavorite() ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        {showClipBoardMsg && renderClipBoardMsg()}

        <h2 data-testid="recih2e-category">{strCategory}</h2>
      </ContainerFood>

      <ContainerRecipes>
        <section>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`• ${ingredient} - ${measures[index]}`}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Instructions</h2>
          <span data-testid="instructions">{strInstructions}</span>
        </section>

        <section>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="303"
            height="200"
            src={ strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
          />
        </section>

        <ContainerCarousel>
          <h2>Recommended</h2>
          {renderCarouselCards()}
        </ContainerCarousel>
      </ContainerRecipes>

      <ButtonDetails
        type="button"
        data-testid="start-recipe-btn"
        onClick={ redirectToProgressPage }
        disabled={ diplayNoneButton() }
      >
        {verifyInProgressById() ? 'Continuar receita' : 'Iniciar receita'}
      </ButtonDetails>
    </MainContainerDetails>
  );

  return renderLoading(FoodDetailsComponent());
}
