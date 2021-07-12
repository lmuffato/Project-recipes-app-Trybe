import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavRecipe] = useState(() => {
    const favRecipe = localStorage.getItem('favoriteRecipes');
    return favRecipe ? JSON.parse(favRecipe) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const setFavorite = () => {
    const recipeDetails = {
      id: recipe.id,
      type: recipe.type,
      area: recipe.area,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
    };
    setFavRecipe((prevRecipes) => [...prevRecipes, recipeDetails]);
    setIsFavorite(true);
  };

  const setUnfavorite = () => {};

  const setButton = () => {
    const recipeId = recipe.id;
    const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let checkLocalStr = [];

    if (getLocalStr !== null) {
      // filtra o LS pelo recipeId
      checkLocalStr = Object.values(getLocalStr).filter(({ id }) => id === recipeId);
    }

    if (checkLocalStr.length === 1 || isFavorite) {
      // recipeId encontrado no LS
      return (
        <button type="button" onClick={ setUnfavorite }>
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="set favorite"
          />
        </button>
      );
    }
    // recipeId não encontrado no LS
    return (
      <button type="button" onClick={ setFavorite }>
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="set favorite"
        />
      </button>
    );
  };

  return (
    <div>
      {
        setButton()
      }
    </div>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoriteBtn;
