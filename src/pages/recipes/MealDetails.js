import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getMealsById, getIngredients, getMeasures } from '../../services/getMeals';
import { getRecomendedDrinks } from '../../services/getDrinks';
import './recipeDetails.css';
import StartRecipeButton from '../../components/StartRecipeButton';
import Context from '../../context/Context';
import MealShareAndFavorite from '../../components/MealShareAndFavorite';

function MealDetails() {
  const {
    mealsId,
    mealsMeasuresId,
    mealsIngredientsId,
    setMealsId,
    setMealsIngredientsId,
    setMealsMeasuresId,
  } = useContext(Context);

  const [drinksCarousel, setDrinksCarousel] = useState([]);
  const match = useRouteMatch();
  const { params: { id } } = match;

  useEffect(() => {
    getMealsById(id)
      .then((meals) => {
        setMealsId(meals);
        const ingredients = getIngredients(meals[0]);
        const measures = getMeasures(meals[0]);
        setMealsIngredientsId(ingredients);
        setMealsMeasuresId(measures);
      });
    getRecomendedDrinks()
      .then((drink) => {
        const SIX = 6;
        const drinks = Object.values(drink).slice(0, SIX);
        setDrinksCarousel(drinks);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderCarousel() {
    return (
      <ul className="recommendation-container">
        { drinksCarousel.map((drink, index) => {
          const {
            strDrink,
            strDrinkThumb,
          } = drink;
          return (
            <li
              key={ drink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="recommendation-img"
                src={ strDrinkThumb }
                alt={ `imagem-da-receita-${strDrink}` }
              />
              <h1 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h1>
            </li>
          );
        }) }
      </ul>
    );
  }

  const renderDetail = () => (
    mealsId.map((info, index) => {
      const {
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
      } = info;
      return (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt="recipe"
            width="100%"
          />
          <h2 data-testid="recipe-title">{ strMeal }</h2>
          <MealShareAndFavorite />
          <p data-testid="recipe-category">{ strCategory }</p>
          <ul>
            Ingredientes
            { mealsIngredientsId.map((ingredient, measurePos) => (
              <li
                data-testid={ `${measurePos}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                { ingredient }
                {' '}
                <strong>
                  { mealsMeasuresId[measurePos] }
                </strong>
              </li>
            )) }
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions">{ strInstructions }</p>
          <iframe
            title="recipe-video"
            data-testid="video"
            src={ strYoutube }
            width="355"
          />
          <div className="card-container">{ renderCarousel() }</div>
          <StartRecipeButton />
        </div>
      );
    })
  );
  return (
    <div>
      { renderDetail() }
    </div>
  );
}

export default MealDetails;
