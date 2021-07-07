import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
// import Slider from 'react-slick';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedDrinks from './RecomendedDrinks';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';

function MealCardDetail() {
  let buttonIniciarReceita = (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-recipe-btn"
      id="start-recipe-btn"
    >
      Iniciar Receita
    </button>);
  const { fullDrinks } = useContext(SearchContext);
  const { currentMeal } = useContext(UserContext);
  const [youtubeId, setYoutubeId] = useState('');
  const donedRecipes = getItemFromLocalStorage('doneRecipes');
  const inProgressRecipes = Object.keys(getItemFromLocalStorage('doneRecipes'));

  const RECOMMENDED_NUMBER = 6;
  useEffect(() => {
    setYoutubeId(currentMeal.strYoutube);
  }, [currentMeal]);

  if (donedRecipes) {
    const findDonedRecipe = donedRecipes.find(({ id }) => {
      const { idMeal } = currentMeal;
      return id === idMeal;
    });
    if (findDonedRecipe) buttonIniciarReceita = '';
  }

  if (inProgressRecipes) {
    const button = document.getElementById('start-recipe-btn');
    const findDonedRecipe = inProgressRecipes.find((id) => {
      const { idMeal } = currentMeal;
      return id === idMeal;
    });
    if (findDonedRecipe) button.innerText = 'Continuar Receita';
  }

  return (
    <div>
      <img
        src={ currentMeal.strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ currentMeal.strMeal }</h3>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h4 data-testid="recipe-category">{ currentMeal.strCategory }</h4>
      <h4>Ingredients</h4>
      <IngredientsList currentMeal={ currentMeal } />
      <h4>Instructions</h4>
      <span data-testid="instructions">{ currentMeal.strInstructions }</span>
      <ReactPlayer
        data-testid="video"
        width="320"
        height="160"
        url={ youtubeId }
      />
      <h4>Recommended Drinks</h4>
      <div className="carousel-list">
        {fullDrinks.map((drink, index) => (
          index < RECOMMENDED_NUMBER ? (
            <RecomendedDrinks
              key={ index }
              recommendationId={ `${index}-recomendation-card` }
              drinkImg={ drink.strDrinkThumb }
              drinkName={ drink.strDrink }
              drinkTitleId={ `${index}-recomendation-title` }
            />
          ) : (null)
        ))}
      </div>
      {buttonIniciarReceita}
    </div>
  );
}

export default MealCardDetail;
