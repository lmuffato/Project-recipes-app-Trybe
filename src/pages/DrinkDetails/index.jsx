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

export default function DrinkDetails() {
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
  } = useRecipeDetails('drink');
  const { renderCarouselCards } = useCarousel(
    filterRecommended(recommended.meals),
    'meal',
  );
  // ALERTA ENGENHARIA DE EMERGÊNCIA
  const recipeDrink = recipe.drinks
    ? recipe.drinks[0]
    : { drinks: [{}] };
  const { ingredients, measures } = getIngredientsAndMeasures(recipeDrink);
  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
  } = recipeDrink;

  const DrinkDetailsComponent = () => (
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
            <BiShareAlt alt="Share" />
          </button>

          <button type="button" onClick={ () => setHeart(recipeDrink) }>
            {checkFavorite() ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        {showClipBoardMsg && renderClipBoardMsg()}

        <h2 data-testid="recih2e-category">{strAlcoholic}</h2>
      </ContainerFood>

      <hr />

      <ContainerRecipes>
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

        <ContainerCarousel>
          <h2>Recommended</h2>
          {renderCarouselCards()}
        </ContainerCarousel>
      </ContainerRecipes>

      <ButtonDetails
        type="button"
        data-testid="start-recipe-btn"
        disabled={ diplayNoneButton() }
        onClick={ redirectToProgressPage }
      >
        {verifyInProgressById() ? 'Continuar receita' : 'Iniciar receita'}
      </ButtonDetails>
    </MainContainerDetails>
  );

  return renderLoading(DrinkDetailsComponent());
}
