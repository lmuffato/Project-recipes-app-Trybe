import React from 'react';
import CarouselCard from '../components/CarouselCard';
import useRecipeDetails from '../hooks/useRecipeDetails';
import '../styles/PageDetails.css';

export default function FoodDetails() {
  const {
    recipe,
    recommended,
    showClipBoardMsg,
    blackHeartIcon,
    whiteHeartIcon,
    setHeart,
    getIngredientsAndMeasures,
    filterRecommended,
    redirectToProgressPage,
    copyToClipBoard,
    renderClipBoardMsg,
    checkFavorite,
    diplayNoneButton,
  } = useRecipeDetails('meal');
  const recipeMeal = recipe.meals[0];
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipeMeal;

  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
    display: diplayNoneButton() ? 'none' : 'block',
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

        <section>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="278"
            height="200"
            src={ strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
          />
        </section>
      </section>

      <section>
        <h2>Recommended</h2>
        <div className="carousel">
          {filterRecommended(recommended.drinks).map((rec, index) => (
            <CarouselCard
              key={ index }
              cardImg={ rec.strDrinkThumb }
              cardTitle={ rec.strDrink }
              cardCategory={ rec.strAlcoholic }
              index={ index }
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ styleFooter }
        onClick={ redirectToProgressPage }
      >
        Continuar Receita
      </button>
    </main>
  );
}
