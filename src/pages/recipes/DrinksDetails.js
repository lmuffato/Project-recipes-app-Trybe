import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getDrinksById, getIngredients, getMeasures } from '../../services/getDrinks';
import { getRecomendedMeals } from '../../services/getMeals';
import './recipeDetails.css';
import shareIcon from '../../images/shareIcon.png';
import whiteHeartIcon from '../../images/whiteHeartIcon.png';
import blackHeartIcon from '../../images/blackHeartIcon.png';
import StartRecipeButton from '../../components/StartRecipeButton';

const copy = require('clipboard-copy');

function DrinksDetails() {
  const [drinksFromId, setDrinksFromId] = useState([]);
  const [ingredientsId, setIngredientsId] = useState([]);
  const [measuresId, setMeasuresId] = useState([]);
  const [buttonFav, setButtonFav] = useState(true);
  const [mealsCarousel, setMealsCarousel] = useState([]);
  const [copyButton, setCopyButton] = useState('');
  const match = useRouteMatch();
  const { params: { id } } = match;

  const setLocal = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  };

  const isFav = () => {
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasFav = favRecipe.filter((element) => element.id === id);
    const condition = hasFav.length > 0;
    if (condition) {
      setButtonFav(!buttonFav);
    } else {
      console.log('is not fav');
    }
  };

  const setHeartToFav = () => {
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    return hasSetLocal ? isFav() : setLocal();
  };

  useEffect(() => {
    getDrinksById(id)
      .then((drinks) => {
        setDrinksFromId(drinks);
        const ingredients = getIngredients(drinks[0]);
        const measures = getMeasures(drinks[0]);
        setIngredientsId(ingredients);
        setMeasuresId(measures);
      });
    getRecomendedMeals()
      .then((meal) => {
        const SIX = 6;
        const meals = Object.values(meal).slice(0, SIX);
        setMealsCarousel(meals);
      });
    setHeartToFav();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyBoard() {
    copy(window.location.href);
    setCopyButton(global.alert('Link copiado!'));
  }

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
              <h2 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h2>
            </li>
          );
        }) }
      </ul>
    );
  }

  const heartButton = (infos) => {
    setButtonFav(!buttonFav);
    const {
      idDrink,
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
    } = infos;
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    if (hasSetLocal) {
      console.log('hello world');
    } else {
      setLocal();
    }
    if (buttonFav === true) {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const mealInfos = [...favRecipe, {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(mealInfos));
    } else {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRemoved = favRecipe.filter((element) => element.id !== idDrink);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRemoved));
    }
  };

  const renderDetail = () => (
    drinksFromId.map((info, index) => {
      const {
        strDrinkThumb,
        strDrink,
        strCategory,
        strInstructions,
        strAlcoholic,
      } = info;
      return (
        <div className="detail-page" key={ index }>
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt="recipe"
            width="100%"
          />
          <div className="header-content">
            <h2 data-testid="recipe-title">{ strDrink }</h2>
            <div className="share-and-favorite-container">
              { copyButton }
              <button
                type="button"
                data-testid="share-btn"
                className="detail-btn"
                onClick={ () => copyBoard() }
              >
                <img
                  src={ shareIcon }
                  alt="share button"
                  width="26px"
                />
              </button>
              <button
                type="button"
                className="detail-btn"
                onClick={ () => heartButton(info) }
              >
                <img
                  src={ !buttonFav ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite button"
                  data-testid="favorite-btn"
                  width="26px"
                />
              </button>
            </div>
          </div>
          <p data-testid="recipe-category" className="category">
            { strCategory }
            {' '}
            { strAlcoholic }
          </p>
          <h2>Ingredientes</h2>
          <ul className="ingredient-list">
            { ingredientsId.map((ingredient, measurePos) => (
              <li
                data-testid={ `${measurePos}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                { ingredient }
                {' '}
                { measuresId[measurePos] }
              </li>
            )) }
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions" className="instructions">{ strInstructions }</p>
          <div className="card-container">{ renderCarousel() }</div>
          <StartRecipeButton path="bebidas" />
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

export default DrinksDetails;
