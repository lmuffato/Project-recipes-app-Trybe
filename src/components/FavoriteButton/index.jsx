import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton({ data, path }) {
  const { pathname } = useLocation();
  function createLocalStorage() {
    const inProgressRecipes = 'favoriteRecipes';
    if (localStorage[inProgressRecipes] === undefined) {
      const obj = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
    }
  }
  const [heartIcon, setHeartIcon] = useState('');

  function favoritar() {
    const idFood = `${path}`;
    const include = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const boolConditional = include.some(({ id }) => id === idFood);
    const favorites = include.filter(({ id }) => id === idFood);
    if (!boolConditional) {
      if (pathname.includes('/bebidas')) {
        const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = data;
        const array = [
          ...include,
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          },
        ];
        localStorage.setItem('favoriteRecipes', JSON.stringify(array));
        setHeartIcon(blackHeartIcon);
      } else {
        const { idMeal, strCategory, strArea, strMeal, strMealThumb } = data;
        const array = [
          ...include,
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
          },
        ];
        localStorage.setItem('favoriteRecipes', JSON.stringify(array));
        setHeartIcon(blackHeartIcon);
      }
    } else {
      const deleteFav = include.filter(({ id }) => id !== favorites[0].id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
      setHeartIcon(whiteHeartIcon);
    }
  }

  function handleClick() {
    favoritar();
  }

  useEffect(() => {
    createLocalStorage();
    function paintHeart() {
      const include = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const color = include.some(({ id }) => id === `${path}`);
      if (color) {
        setHeartIcon(blackHeartIcon);
      } else {
        setHeartIcon(whiteHeartIcon);
      }
    }
    paintHeart();
  }, [path]);

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="favorite-btn"
    >
      <img
        src={ heartIcon }
        alt="favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  data: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
}.isRequired;

export default FavoriteButton;
