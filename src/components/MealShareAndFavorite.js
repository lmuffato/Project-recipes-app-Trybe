import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Context from '../context/Context';

const copy = require('clipboard-copy');

export default function MealShareAndFavorite() {
  const { inProgressMealsId } = useContext(Context);
  const [buttonFav, setButtonFav] = useState(true);
  const [copyButton, setCopyButton] = useState('');

  const match = useRouteMatch();
  const { params: { id } } = match;

  const setLocal = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  };

  function copyBoard() {
    copy(window.location.href);
    setCopyButton('Link copiado!');
  }

  const isFav = () => {
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasFav = favRecipe.filter((element) => element.id === id);
    console.log(hasFav);
    const condition = hasFav.length > 0;
    if (condition) {
      setButtonFav(!buttonFav);
    } else {
      console.log('is not fav');
    }
  };

  const setHeartToFav = () => {
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    return hasSetLocal ? isFav() : setLocal();
  };

  useEffect(() => {
    setHeartToFav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heartButton = (infos) => {
    setButtonFav(!buttonFav);
    const {
      idMeal,
      strCategory,
      strMeal,
      strMealThumb,
      strArea,
    } = infos;
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    if (hasSetLocal) {
      console.log('hello world');
    } else {
      setLocal();
    }
    if (buttonFav === true) {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const mealInfos = [...favRecipe, {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(mealInfos));
    } else {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favRecipe);
      const filteredRemoved = favRecipe.filter((element) => element.id !== idMeal);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRemoved));
      console.log(localStorage.getItem('favoriteRecipes'));
    }
  };
  return (
    <div>
      { inProgressMealsId.map((info, index) => (
        <div key={ index } className="share-and-favorite-container">
          <button type="button" data-testid="share-btn" onClick={ () => copyBoard() }>
            <img src={ shareIcon } alt="share button" />
          </button>
          { copyButton }
          <button type="button" onClick={ () => heartButton(info) }>
            <img
              src={ !buttonFav ? blackHeartIcon : whiteHeartIcon }
              alt="favorite button"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      )) }
    </div>
  );
}
