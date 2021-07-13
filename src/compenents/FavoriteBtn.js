import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipesContext from '../contexts/RecipesContext';

function FavoriteBtn({ id, type, area, category, alcoholicOrNot, name, image }) {
  const { favoriteRecipes, setFavRecipes } = useContext(RecipesContext);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const setFavorite = () => {
    const recipeDetails = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    setFavRecipes((prevRecipes) => [...prevRecipes, recipeDetails]);
    setIsFavorite(true);
  };

  const setUnfavorite = () => {
    const recipeId = id;

    // const getFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeFav = Object.values(favoriteRecipes)
      .filter(({ id: favId }) => favId !== recipeId);

    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavRecipes(removeFav);
  };

  const setButton = () => {
    const recipeId = id;
    const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let checkLocalStr;

    if (getLocalStr !== null) {
      // procura o recipeId no LS
      checkLocalStr = Object.values(getLocalStr)
        .find(({ id: favoriteId }) => favoriteId === recipeId);
    }

    if (checkLocalStr || isFavorite) {
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
