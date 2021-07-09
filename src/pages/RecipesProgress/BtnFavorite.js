import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import { AppContext } from '../../context/AppContext';

// import { Container } from './styles';

export default function BtnFavorite({ recipe }) {
  const { context } = useContext(AppContext);
  const { pageOrigin } = context;
  const [isFavorite, setIsFavorite] = useState(false);
  const key = 'favoriteRecipes';
  const toStorage = [{
    id: recipe.idMeal || recipe.idDrink,
    type: pageOrigin === 'themealdb' ? 'comida' : 'bebida',
    area: recipe.strArea || null,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || null,
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: new Date(),
    tags: recipe.strTags || null,
  }];

  const handleFavoriteRecipe = useCallback(() => {
    setIsFavorite(!isFavorite);
    console.log(toStorage);
  }, [isFavorite]);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleFavoriteRecipe }
    >
      <img src={ isFavorite ? blackHeart : whiteHeart } alt="imagem favoritar" />
    </button>

  );
}

BtnFavorite.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};
