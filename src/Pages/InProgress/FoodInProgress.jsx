import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodDetail, setFoodDetail] = useState([]);

  useEffect(() => {
    fetchFoodForId(id)
      .then(({ meals }) => setFoodDetail(meals));
  }, [id]);

  if (!foodDetail.length) return <div>Preparing Ingredients...</div>;
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions } = foodDetail[0];

  function ingredientsList() {
    const ingredients = Object.entries(foodDetail[0]);
    const start = 9;
    const end = 28;
    const slicing = ingredients.slice(start, end);
    const mapSlice = slicing.map((ingredient, index) => (
      <label key={ index } htmlFor="ingredient">
        <input
          id="ingredient"
          type="checkbox"
          data-testid={ `${index}-ingredient-step` }
        />
        {ingredient[1]}
      </label>));
    return mapSlice;
  }

  return (
    <>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="food" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h2 data-testid="recipe-category">{strCategory}</h2>
      <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
      <h4>Ingredients :</h4>
      {ingredientsList()}
      <h4>Instructions :</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </>
  );
}

export default FoodInProgress;
