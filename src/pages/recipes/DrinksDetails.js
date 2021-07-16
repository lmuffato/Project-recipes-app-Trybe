import React from 'react';

function DrinksDetails() {
import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getDrinksById, getIngredients, getMeasures } from '../../services/getDrinks';
import { getRecomendedMeals } from '../../services/getMeals';
import './recipeDetails.css';
import StartRecipeButton from '../../components/StartRecipeButton';
import CopyAndFavorite from '../../components/DrinkShareAndFavorite';
import Context from '../../context/Context';

function DrinksDetails() {
  const {
    setDrinksId,
    drinksId,
    setDrinksIngredientsId,
    setDrinksMeasuresId,
    drinksMeasuresId,
    drinksIngredientsId,
  } = useContext(Context);

  const [mealsCarousel, setMealsCarousel] = useState([]);
  const match = useRouteMatch();
  const { params: { id } } = match;
  const history = useHistory();

  function copyBoard() {
    copy(window.location.href);
    global.alert('Link copiado!');
  }

  useEffect(() => {
    getDrinksById(id)
      .then((drinks) => {
        setDrinksId(drinks);
        const ingredients = getIngredients(drinks[0]);
        const measures = getMeasures(drinks[0]);
        setDrinksIngredientsId(ingredients);
        setDrinksMeasuresId(measures);
      });
    getRecomendedMeals()
      .then((meal) => {
        console.log(meal);
        const SIX = 6;
        const meals = Object.values(meal).slice(0, SIX);
        setMealsCarousel(meals);
      });
  }, []);

  function renderCarousel() {
    return (
      <ul className="recommendation-container">
        { mealsCarousel.map((meal, index) => {
          const {
            strMeal,
            strMealThumb,
          } = meal;
          return (
            <li
              key={ meal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="recommendation-img"
                src={ strMealThumb }
                alt={ `imagem-da-receita-${strMeal}` }
              />
              <h1 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h1>
            </li>
          );
        }) }
      </ul>
    );
  }

  const setLocal = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  function heartButton(infos) {
    setButtonFav(!buttonFav);
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
    } = infos;
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    hasSetLocal ? console.log('hello world') : setLocal();
    if (buttonFav === true) {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const drinkInfos = [...favRecipe, {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(drinkInfos));
    } else {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favRecipe);
      const filteredRemoved = favRecipe.filter((element) => element.id !== idDrink);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRemoved));
      console.log(localStorage.getItem('favoriteRecipes'));
    }
  }

  const renderDetail = () => (
    drinksId.map((info, index) => {
      const {
        strDrinkThumb,
        strDrink,
        strCategory,
        strInstructions,
        strAlcoholic,
      } = info;
      return (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt="recipe"
            width="100%"
          />
          <h2 data-testid="recipe-title">{ strDrink }</h2>
          <CopyAndFavorite />
          <p data-testid="recipe-category">
            { strCategory }
            {' '}
            { strAlcoholic }
          </p>
          <ul>
            <h2>Ingredientes</h2>
            { drinksIngredientsId.map((ingredient, measurePos) => (
              <li
                data-testid={ `${measurePos}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                { ingredient }
                {' '}
                <strong>
                  { drinksMeasuresId[measurePos] }
                </strong>
              </li>
            )) }
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions">{ strInstructions }</p>
          { renderCarousel() }
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

export default DrinksDetails;
