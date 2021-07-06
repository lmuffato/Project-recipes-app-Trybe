import React from 'react';
import { number, string } from 'prop-types';

import blackHeart from '../../images/blackHeartIcon.svg';

const FAVORITE_RECIPES = 'favoriteRecipes';
function removeFromFavorites(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  localStorage.setItem(
    FAVORITE_RECIPES, JSON.stringify(
      favoriteRecipes
        .filter((recipe) => (recipe.type === 'comida' ? recipe.id !== id : true)),
    ),
  );
}

function Favorite({ id, index }) {
  return (
    <button
      type="button"
      data-testid={ `${index}-horizontal-favorite-btn` }
      src={ blackHeart }
      onClick={ () => removeFromFavorites(id) }
    >
      <img src={ blackHeart } alt="Favoritar" />
    </button>
  );
}

Favorite.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
};

export default Favorite;
