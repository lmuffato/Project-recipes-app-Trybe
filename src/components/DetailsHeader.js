import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/DetailsHeader.css';

import FavoritesContext from '../contexts/FavoritesContext';

const copy = require('clipboard-copy');

export default function DetailsHeader({ recipe, isFood }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;
  const recipeType = isFood ? 'comida' : 'bebida';
  const recipeArea = recipe.strArea ? recipe.strArea : '';
  const recipeCategory = recipe.strCategory;
  const recipeAlcoholicOrNot = isFood ? '' : recipe.strAlcoholic;
  const recipeName = isFood ? recipe.strMeal : recipe.strDrink;
  const recipeImage = isFood ? recipe.strMealThumb : recipe.strDrinkThumb;

  const { favorites, setFavorites, saveFavoritesToLS } = useContext(FavoritesContext);

  const [isFavorite, setIsFavorite] = useState(
    favorites.map((fav) => fav.id).includes(recipeId),
  );

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavoriteLS = favoriteRecipes.map((fav) => fav.id).includes(recipeId);
      if (isFavoriteLS) setIsFavorite(true);
    }
  }, [recipeId]);

  const { pathname } = useLocation();

  function handleShareClick() {
    const pageType = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    copy(`${window.location.origin}/${pageType}/${id}`);

    const copyMsg = document.createElement('p');
    copyMsg.innerText = 'Link copiado!';
    copyMsg.className = 'toast';
    document.getElementsByTagName('body')[0].appendChild(copyMsg);
    const WAIT_TIME = 4000;
    setTimeout(() => {
      copyMsg.remove();
    }, WAIT_TIME);
  }

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
    saveFavoritesToLS(updatedFavorites);
  }

  return (
    <div>
      <img
        src={ recipeImage }
        alt={ recipeName }
        data-testid="recipe-photo"
        className="details-header-img"
      />
      <div className="details-header-middle">
        <h1 data-testid="recipe-title">
          { recipeName }
        </h1>
        <div className="buttons-container">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          <button
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
        </div>
      </div>
      <p data-testid="recipe-category">{ recipeCategory }</p>
    </div>
  );
}

DetailsHeader.propTypes = {
  recipes: PropTypes.shape({}),
  isFood: PropTypes.bool,
  isDrink: PropTypes.bool,
}.isRequired;
