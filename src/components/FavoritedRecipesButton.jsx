import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import UserContext from '../context/UserContext';
import { setToLocalStorage } from '../services/localStorage';

function FavoritedRecipesButton({ favoriteId, elementId }) {
  const { setFavoriteRecipe, favoriteRecipe } = useContext(UserContext);

  const handleClick = () => {
    const filteredFavorites = favoriteRecipe.filter((recipe) => recipe.id !== elementId);
    setFavoriteRecipe(filteredFavorites);
  };

  useEffect(() => {
    setToLocalStorage('favoriteRecipes', favoriteRecipe);
  }, [favoriteRecipe]);

  return (
    <button type="button" onClick={ handleClick } className="shareButton">
      <img data-testid={ favoriteId } src={ blackHeartIcon } alt="favoritar" />
    </button>
  );
}

FavoritedRecipesButton.propTypes = {
  favoriteId: PropTypes.string,
}.isRequired;

export default FavoritedRecipesButton;
