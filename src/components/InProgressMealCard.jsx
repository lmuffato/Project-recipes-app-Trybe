import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import IngredientsCheckBox from './IngredientsCheckBox';

const copy = require('clipboard-copy');

function InProgressMealCard() {
  const { currentMeal } = useContext(UserContext);
  const [copyLink, setCopyLink] = useState(false);
  const history = useHistory();
  const shareClick = () => {
    const URL = history.location.pathname;
    copy(`http://localhost:3000${URL}`);
    setCopyLink(true);
  };
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ currentMeal.strMealThumb }
        alt="Current Meal"
      />
      <h3 data-testid="recipe-title">{currentMeal.strMeal}</h3>
      <button data-testid="share-btn" type="button" onClick={ shareClick }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      {copyLink ? <span>Link copiado!</span> : null}
      <FavoriteButton type="comida" />
      <h4 data-testid="recipe-category">{ currentMeal.strCategory }</h4>
      <h4>Ingredients</h4>
      <IngredientsCheckBox currentMeal={ currentMeal } />
      <h4>Instructions</h4>
      <span data-testid="instructions">{ currentMeal.strInstructions }</span>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default InProgressMealCard;
