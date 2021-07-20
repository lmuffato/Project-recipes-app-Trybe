import React, { useContext } from 'react';
import { number, string } from 'prop-types';

import blackHeart from '../../images/blackHeartIcon.svg';
import storageContext from '../../context/StorageContext';

const FAVORITE_RECIPES = 'favoriteRecipes';
function removeFromFavorites(favoriteRecipes, updateContext, id) {
  localStorage.setItem(
    FAVORITE_RECIPES, JSON.stringify(
      favoriteRecipes
        .filter((recipe) => (recipe.type === 'comida' ? recipe.id !== id : true)),
    ),
  );
  updateContext();
}

function Favorite({ id, index }) {
  const { favoriteRecipes, syncFavoriteRecipes } = useContext(storageContext);

  return (
    <button
      className="icones-btn"
      type="button"
      data-testid={ `${index}-horizontal-favorite-btn` }
      src={ blackHeart }
      onClick={ () => removeFromFavorites(favoriteRecipes, syncFavoriteRecipes, id) }
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
