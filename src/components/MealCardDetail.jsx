import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedDrinks from './RecomendedDrinks';

function MealCardDetail() {
  const { currentMeal } = useContext(UserContext);
  const youtubeId = currentMeal.strYoutube;
  // const splits = youtubeId.split('=', 2);
  // console.log(splits);
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
      <RecomendedDrinks />
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </div>
  );
}

export default MealCardDetail;
