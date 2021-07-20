import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { head } from 'lodash';

import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

const FAVORITE_RECIPES = 'favoriteRecipes';
function removeFromFavorites(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  localStorage.setItem(
    FAVORITE_RECIPES, JSON.stringify(
      favoriteRecipes.filter((recipe) => recipe.id !== id),
    ),
  );
}
function addToFavorites(mealDetails) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const { idMeal: id,
    strArea: area,
    strCategory: category,
    strMealThumb: image,
    strMeal: name } = head(mealDetails);
  localStorage.setItem(
    FAVORITE_RECIPES, JSON.stringify(
      [...favoriteRecipes, {
        id,
        area,
        category,
        image,
        name,
        alcoholicOrNot: '',
        type: 'comida' }],
    ),
  );
}

function Favorite() {
  const [isFavorite, setIsFavorite] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
    setIsFavorite(favoriteRecipes && favoriteRecipes
      .some((recipe) => Number(recipe.id) === Number(id)));
  }, [id]);
  const mealDetails = useSelector((state) => state.meals.mealDetails);

  function toggleStatus() {
    if (isFavorite) {
      setIsFavorite(false);
      return removeFromFavorites(id);
    }
    setIsFavorite(true);
    return addToFavorites(mealDetails);
  }
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="icones-btn"
      src={ isFavorite ? blackHeart : whiteHeart }
      onClick={ toggleStatus }
    >
      <img src={ isFavorite ? blackHeart : whiteHeart } alt="Favoritar" />
    </button>
  );
}

export default Favorite;
