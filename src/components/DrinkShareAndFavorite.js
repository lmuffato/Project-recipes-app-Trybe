import React, { useEffect, useState } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { useRouteMatch } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function DrinkShareAndFavorite({ drinks }) {
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
  }, []);

  function heartButton(infos) {
    setButtonFav(!buttonFav);
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
    } = infos;
    const hasSetLocal = localStorage.getItem('favoriteRecipes');
    if (hasSetLocal) {
      console.log('hello world');
    } else {
      setLocal();
    }
    if (buttonFav === true) {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const drinkInfos = [...favRecipe, {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(drinkInfos));
    } else {
      const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRemoved = favRecipe.filter((element) => element.id !== idDrink);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRemoved));
    }
  }
  return (
    <div>
      { drinks.map((info, index) => (
        <div key={ index } className="share-and-favorite-container">
          <button type="button" data-testid="share-btn" onClick={ () => copyBoard() }>
            <img src={ shareIcon } alt="share button" />
          </button>
          <button type="button" onClick={ () => heartButton(info) }>
            <img
              src={ !buttonFav ? blackHeartIcon : whiteHeartIcon }
              alt="favorite button"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      )) }
      { copyButton }
    </div>
  );
}

DrinkShareAndFavorite.propTypes = {
  drinks: PropTypes.arrayOf(objectOf(PropTypes.string)).isRequired,
};
