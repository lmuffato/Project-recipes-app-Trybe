import React from 'react';
import { actionFavorites } from '../redux/actions';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';

const AddFavorite = (type, recipe, dispatch) => {
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
    dispatch(actionFavorites(newObj));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    dispatch(actionFavorites([obj]));
  }
};

const RemoveFavorite = (type, recipe, dispatch) => {
  const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;
  const previousValue = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newValue = previousValue.filter((obj) => obj.id !== recipeId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newValue));
  dispatch(actionFavorites(newValue));
};

export default function RenderFavoriteHeart(type, recipe, dispatch) {
  const recipeId = type === 'comida' ? recipe.idMeal : recipe.idDrink;
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let check = '';
  if (storage && storage.length > 0) {
    check = storage.filter((st) => st.id.includes(recipeId));
  }
  if (check.length > 0) {
    return (
      <button type="button" onClick={ () => RemoveFavorite(type, recipe, dispatch) }>
        <img alt="favorite" data-testid="favorite-btn" src={ blackFavoriteIcon } />
      </button>
    );
  }
  return (
    <button type="button" onClick={ () => AddFavorite(type, recipe, dispatch) }>
      <img alt="favorite" data-testid="favorite-btn" src={ whiteFavoriteIcon } />
    </button>
  );
}
