import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import heartColorService from '../services/heartColorService';

function FavoriteButton({ type, favoriteId = 'favorite-btn' }) {
  const { currentDrink, currentMeal,
    setFavoriteRecipe, favoriteRecipe } = useContext(UserContext);
  const [heartColor, setHeartColor] = useState('');

  const handleClick = () => {
    if (type === 'comida') {
      const findRecipe = favoriteRecipe.find((recipe) => (
        currentMeal.idMeal === recipe.id));
      if (!findRecipe) {
        setFavoriteRecipe([
          ...favoriteRecipe,
          {
            id: currentMeal.idMeal,
            type,
            area: currentMeal.strArea,
            category: currentMeal.strCategory,
            alcoholicOrNot: '',
            name: currentMeal.strMeal,
            image: currentMeal.strMealThumb,
          },
        ]);
      } else {
        setFavoriteRecipe(favoriteRecipe.filter((recipe) => (
          recipe.id !== currentMeal.idMeal)));
      }
    }
    if (type === 'bebida') {
      const findRecipe = favoriteRecipe.find((recipe) => (
        currentDrink.idDrink === recipe.id));
      if (!findRecipe) {
        setFavoriteRecipe([
          ...favoriteRecipe,
          {
            id: currentDrink.idDrink,
            type,
            area: '',
            category: currentDrink.strCategory,
            alcoholicOrNot: currentDrink.strAlcoholic,
            name: currentDrink.strDrink,
            image: currentDrink.strDrinkThumb,
          },
        ]);
      } else {
        setFavoriteRecipe(favoriteRecipe.filter((recipe) => (
          recipe.id !== currentDrink.idDrink)));
      }
    }
  };

  useEffect(() => {
    const obj = {
      favoriteRecipe,
      type,
      currentMeal,
      currentDrink,
      setHeartColor,
    };
    heartColorService(obj);
  });

  return (
    <button type="button" onClick={ handleClick } className="shareButton">
      {heartColor === 'white' ? (
        <img
          data-testid={ favoriteId }
          src={ whiteHeartIcon }
          alt="favoritar"
          className="shareAndFavoriteImgs"
        />
      ) : (
        <img
          data-testid={ favoriteId }
          src={ blackHeartIcon }
          alt="favoritar"
        />
      )}
    </button>
  );
}

// "favorite-btn"

FavoriteButton.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default FavoriteButton;
