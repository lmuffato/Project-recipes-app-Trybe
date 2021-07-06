import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/DetailsHeader.css';

const copy = require('clipboard-copy')

export default function DetailsHeader({ recipe, isFood, isDrink }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;
  const recipeType = isFood ? 'comida' : 'bebida';
  const recipeArea = recipe.strArea
  const recipeCategory = recipe.strCategory
  const recipeAlcoholicOrNot = isFood ? '' : recipe.strAlcoholic
  const recipeName = isFood ? recipe.strMeal : recipe.strDrink
  const recipeImage = isFood ? recipe.strMealThumb : recipe.strDrinkThumb

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (!favorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  const [isFavorite, setIsFavorite] = useState(
    favorites.map((fav) => fav.id).includes(recipeId),
  );

  function handleShareClick() {
    copy(window.location.href);
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
      updatedFavorites = favorites.filter((fav) => {
        return fav.id !== (isFood ? recipe.idMeal : recipe.idDrink);
      });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
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
            data-testid="favorite-btn"
            onClick={ () => {
              setIsFavorite(!isFavorite);
              handleFavoriteClick();
            } }
          >
            <img src={ isFavorite ? whiteHeartIcon : blackHeartIcon } alt="favoritar" />
          </button>
        </div>
      </div>
      <p data-testid="recipe-category">{ recipeCategory }</p>
    </div>
  );
}
