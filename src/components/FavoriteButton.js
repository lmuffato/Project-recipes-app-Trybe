import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import FavoritesContext from '../contexts/FavoritesContext';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import FoodContext from '../contexts/FoodContext';
import { invert } from 'lodash';
// Warning: CSS Inline in Button

export default function FavoriteButton({ recipe, isFood }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;
  const recipeType = isFood ? 'comida' : 'bebida';
  const recipeArea = recipe.strArea ? recipe.strArea : '';
  const recipeCategory = recipe.strCategory;
  const recipeAlcoholicOrNot = isFood ? '' : recipe.strAlcoholic;
  const recipeName = isFood ? recipe.strMeal : recipe.strDrink;
  const recipeImage = isFood ? recipe.strMealThumb : recipe.strDrinkThumb;
  const context = useContext(FoodContext);
  const { color: { colorDiv } } = context;

  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [isFavorite, setIsFavorite] = useState(
    favorites.map((fav) => fav.id).includes(recipeId),
  );

  function handleFavoriteClick() {
    let updatedFavorites;
    if (!isFavorite) {
      updatedFavorites = [...favorites, {
        id: recipeId,
        type: recipeType,
        area: recipeArea,
        category: recipeCategory,
        alcoholicOrNot: recipeAlcoholicOrNot,
        name: recipeName,
        image: recipeImage,
      }];
    } else {
      updatedFavorites = favorites.filter(
        (fav) => fav.id !== (recipeId),
      );
    }
    setFavorites(updatedFavorites);
  }

  useEffect(() => {
    // gets favorites from LS, if there is any
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavoriteLS = favoriteRecipes.map((fav) => fav.id).includes(recipeId);
      if (isFavoriteLS) setIsFavorite(true);
    }
  }, [recipeId]);

  return (
    <button
      style={ {
        textAlign: 'center',
        width: 40,
        height: 40,
        filter: invert(100),
        backgroundColor: colorDiv } }
      type="button"
      onClick={ () => {
        setIsFavorite(!isFavorite);
        handleFavoriteClick();
      } }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favoritar"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
  isFood: PropTypes.bool,
}.isRequired;
