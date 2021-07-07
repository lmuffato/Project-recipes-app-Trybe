import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import ButtonStartRecipe from './ButtonStartRecipe';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedDrinks from './RecomendedDrinks';
import SearchContext from '../context/SearchContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import { recipeRow } from '../services/recipeRow';

function MealCardDetail() {
  const { fullDrinks } = useContext(SearchContext);
  const { currentMeal } = useContext(UserContext);
  const [youtubeId, setYoutubeId] = useState('');
  const [textButton, setTextButton] = useState('Iniciar Receita');
  const donedRecipes = getItemFromLocalStorage('doneRecipes');
  let inProgressRecipes;
  if (getItemFromLocalStorage('inProgressRecipes')) {
    inProgressRecipes = Object.keys(getItemFromLocalStorage('inProgressRecipes').meals);
  }

  const RECOMMENDED_NUMBER = 6;
  useEffect(() => {
    setYoutubeId(currentMeal.strYoutube);
  }, [currentMeal]);

  useEffect(() => {
    const obj = {
      donedRecipes,
      textButton,
      inProgressRecipes,
      setTextButton,
      currentMeal,
    };
    recipeRow(obj);
  });

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
      {textButton !== '' ? (
        <ButtonStartRecipe buttonText={ textButton } />
      ) : (null)}
    </div>
  );
}

export default MealCardDetail;
