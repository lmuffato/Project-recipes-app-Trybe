import React, { useContext } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import context from '../../store/Context';

function FoodInProgress() {
  const { foodDetails } = useContext(context);
  const handleClick = (param) => {
    redirect 
    // passar a s infos do foods como props 
  }

  return (
    <>
      {foodDetails.map((food) => (
        <div key={ food.idMeal }>
          <img data-testid="recipe-photo" src={ food.strMealThumb } alt="food" />
          <h1 data-testid="recipe-title">{food.strMeal}</h1>
          <h2 data-testid="recipe-category">{food.strCategory}</h2>
          <p data-testid="instructions">{food.strInstructions}</p>
          <button type="button" onclick={() => handleClick(food)}>x</button>
        </div>
      ))}
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
      <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </>
  );
}

export default FoodInProgress;
