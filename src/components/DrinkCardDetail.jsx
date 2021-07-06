import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from './IngredientsList';
import RecomendedMeals from './RecomendedMeals';

function DrinkCardDetail() {
  const { currentDrink } = useContext(UserContext);
  return (
    <div>
      <img
        src={ currentDrink.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ currentDrink.strDrink }</h3>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h4 data-testid="recipe-category">{ currentDrink.strAlcoholic }</h4>
      <h4>Ingredients</h4>
      <IngredientsList currentMeal={ currentDrink } />
      <h4>Instructions</h4>
      <span data-testid="instructions">{ currentDrink.strInstructions }</span>
      <h4>Recommended Meals</h4>
      <RecomendedMeals />
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </div>
  );
}

export default DrinkCardDetail;
