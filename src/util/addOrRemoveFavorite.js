import React from 'react';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';

const addFavorite = (type, recipe) => {
  const obj = {
    id: type === 'bebida' ? recipe.idDrink : recipe.idMeal,
    type: type === 'bebida' ? 'bebida' : 'comida',
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: type === 'bebida' ? recipe.strAlcoholic : '',
    name: type === 'bebida' ? recipe.strDrink : recipe.strMeal,
    image: type === 'bebida' ? recipe.strDrinkThumb : recipe.strMealThumb,
  //   // doneDate,
  //   // tags,
  };
  const previousValue = localStorage.getItem('favoriteRecipes');
  if (previousValue) {
    const formatedPreviousValue = JSON.parse(previousValue);
    const newObj = [...formatedPreviousValue, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newObj));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  }
};

const removeFavorite = (type, recipe) => {
  const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;
  const previousValue = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newValue = previousValue.filter((obj) => obj.id !== recipeId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newValue));
};

export default function RenderFavoriteHeart(type, recipe) {
  const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;
  const storage = localStorage.getItem('favoriteRecipes');
  let check = '';
  if (storage) {
    const formatedStorage = JSON.parse(storage);
    check = formatedStorage.filter((st) => st.id.includes(recipeId));
  }
  if (check.length > 0) {
    return (
      <button type="button" onClick={ () => removeFavorite(type, recipe) }>
        <img alt="favorite" data-testid="favorite-btn" src={ blackFavoriteIcon } />
      </button>
    );
  }
  return (
    <button type="button" onClick={ () => addFavorite(type, recipe) }>
      <img alt="favorite" data-testid="favorite-btn" src={ whiteFavoriteIcon } />
    </button>
  );
}
