import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import { AppContext } from '../../context/AppContext';

export default function BtnFavorite({ id }) {
  const { context } = useContext(AppContext);
  const { setRecipeContext, toStorage, recipeContext, recipe } = context;
  const [isFavorite, setIsFavorite] = useState(false);

  const key = 'favoriteRecipes';

  function handleFavoriteRecipe() {
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    setRecipeContext(recipe);
  }, [recipe]);

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const result = JSON.parse(storageValue);
      const comparison = result && result.some((item) => (
        item.id === id));
      if (comparison) {
        setIsFavorite(true);
      }
    }
  }, [recipe.idMeal, recipe.idDrink, recipeContext, id]);

  useEffect(() => {
    if (isFavorite === true) {
      localStorage.setItem(key, JSON.stringify(toStorage));
    } else {
      localStorage.removeItem(key);
    }
  }, [isFavorite, toStorage]);

  return (
    <button
      type="button"
      onClick={ handleFavoriteRecipe }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeart : whiteHeart }
        alt="imagem favoritar"
      />
    </button>

  );
}

BtnFavorite.propTypes = {
  id: PropTypes.string.isRequired,
};
