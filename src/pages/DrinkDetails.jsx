import React from 'react';
import useRecipeDetails from '../hooks/useRecipeDetails';
import CarouselCard from '../components/CarouselCard';

export default function DrinkDetails() {
  const { recipe,
    getIngredientsAndMeasures,
    recommended,
    filterRecommended,
  } = useRecipeDetails('cocktail');
  // ALERTA GAMBIARRA
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

  return (
    <main>
      <section>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="#" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <button type="button" data-testid="share-btn">
          Share button
        </button>
        <button type="button" data-testid="favorite-btn">
          Favorite button
        </button>
        <p data-testid="recipe-category">{strAlcoholic}</p>
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
      </section>
      <section>

        <h2>Recommended</h2>
        <div className="carousel">
          {filterRecommended(recommended.meals).map((rec, index) => (
            <CarouselCard
              key={ rec.idMeal }
              cardImg={ rec.strMealThumb }
              cardTitle={ rec.strMeal }
              cardCategory={ rec.strCategory }
              index={ index }
            />
          ))}
        </div>
      </section>

      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </main>
  );
}
