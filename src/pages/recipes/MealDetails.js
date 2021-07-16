import React from 'react';

function MealDetails() {
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
  const history = useHistory();
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
  
  const setLocal = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  const heartButton = (infos) => {
    setButtonFav(!buttonFav);
    console.log(buttonFav);
    const {
      idMeal,
      strCategory,
      strMeal,
      strMealThumb,
      strTags,
      strArea,
    } = infos;
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    hasSetLocal ? console.log('hello world') : setLocal();
    if (buttonFav === true) {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const mealInfos = [...favRecipe, {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(mealInfos));
    } else {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favRecipe);
      const filteredRemoved = favRecipe.filter((element) => element.id !== idMeal);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRemoved));
      console.log(localStorage.getItem('favoriteRecipes'));
    }
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
          <div className="share-and-favorite-container">
            <button type="button" onClick={ () => copyBoard() }>
              <img
                src={ shareIcon }
                alt="share button"
                data-testid="share-btn"
              />
            </button>
            <button type="button" onClick={ () => heartButton(info) }>
              <img
                src={ buttonFav ? blackHeartIcon : whiteHeartIcon }
                alt="favorite button"
                data-testid="favorite-btn"
              />
            </button>
          </div>
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
      <h1>hello world</h1>
    </div>
  );
}

export default MealDetails;
