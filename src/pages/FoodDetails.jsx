import React from 'react';
import CarouselCard from '../components/CarouselCard';
import useRecipeDetails from '../hooks/useRecipeDetails';
import '../styles/PageDetails.css';

export default function FoodDetails() {
  const {
    recipe,
    recommended,
    getIngredientsAndMeasures,
    filterRecommended,
    redirectToProgressPage,
    copyToClipBoard,
  } = useRecipeDetails('meal');
  const recipeMeal = recipe.meals[0];
  const { ingredients, measures } = getIngredientsAndMeasures(recipeMeal);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipeMeal;

  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
  };

  return (
    <main>
      <section>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
          Share button
        </button>
        <button type="button" data-testid="favorite-btn">
          Favorite button
        </button>

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
