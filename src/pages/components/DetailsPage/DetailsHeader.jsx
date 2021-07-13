import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

const favoriteRecipe = (recipe, type, isFavorited) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (isFavorited) {
    const removeFromList = favorites.filter((item) => !(
      item.id === recipe.idMeal
      || item.id === recipe.idDrink
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromList));
  } else {
    const currentRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: type === 'meals' ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    };

    if (favorites) favorites.push(currentRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites || [currentRecipe]));
  }
};

function DetailsHeader(props) {
  const { recipe, type, pathname } = props;
  const title = recipe.strDrink || recipe.strMeal;
  const img = recipe.strDrinkThumb || recipe.strMealThumb;
  const category = recipe.strAlcoholic || recipe.strCategory;

  const [isFavorited, isFavoritedToggle] = useState(false);
  const [copyMessage, copyMessageToggle] = useState(true);

  // eslint-disable-next-line
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorites) return;
    const checkFavorited = favorites.find((favoritedRecipe) => (
      favoritedRecipe.id === recipe.idMeal
      || favoritedRecipe.id === recipe.idDrink
    ));
    if (checkFavorited) isFavoritedToggle(true);
  });

  const copyToClipboard = () => {
    const link = `http://localhost:3000${pathname.split('/in-progress')[0]}`;
    navigator.clipboard.writeText(link);

    copyMessageToggle(false);

    const threeSeconds = 3000;
    setTimeout(() => {
      copyMessageToggle(true);
    }, threeSeconds);
  };

  return (
    <div className="details-header">
      <img
        src={ img }
        alt={ title }
        className="details-img"
        data-testid="recipe-photo"
      />
      <div className="details-name-btns">
        <h1 data-testid="recipe-title" className="details-name">{ title }</h1>
        <div className="details-btns">
          <span hidden={ copyMessage } className="details-span">
            Link copiado!
          </span>
          <button
            type="button"
            onClick={ copyToClipboard }
            className="details-btn"
          >
            <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
          </button>
          <button
            type="button"
            className="details-btn"
            onClick={ () => {
              favoriteRecipe(recipe, type, isFavorited);
              isFavoritedToggle(!isFavorited);
            } }
          >
            <img
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="Share icon"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      <h2 data-testid="recipe-category" className="details-category">
        { category }
      </h2>
    </div>
  );
}

DetailsHeader.propTypes = {
  img: string,
  title: string,
}.isRequired;

export default DetailsHeader;
