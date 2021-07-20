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
function addToFavorites(drinkDetails) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const { idDrink: id,
    strAlcoholic: alcoholicOrNot,
    strDrinkThumb: image,
    strCategory: category,
    strDrink: name } = head(drinkDetails);
  localStorage.setItem(
    FAVORITE_RECIPES, JSON.stringify(
      [...favoriteRecipes, {
        id,
        area: '',
        category,
        image,
        name,
        alcoholicOrNot,
        type: 'bebida' }],
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
  const drinkDetails = useSelector((state) => state.drinks.drinkDetails);
  function toggleStatus() {
    if (isFavorite) {
      setIsFavorite(false);
      return removeFromFavorites(id);
    }
    setIsFavorite(true);
    return addToFavorites(drinkDetails);
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
