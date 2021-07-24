import React from 'react';
import copy from 'clipboard-copy';
import { useStateEasyRedux, useClassState } from 'easy-redux-trybe';
import Header from '../components/Header';
import { setLocalStorage, getLocalStorage } from '../helper';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import styles from '../styles/FavoritePage.module.scss';

function FavoriteRecipies() {
  const [copyUrl, setCopyUrl] = useStateEasyRedux({ name: 'copyFood' }, {});
  const [favorites, setFavorites] = useClassState({ favorite: true });
  const favRecipes = getLocalStorage('favoriteRecipes');

  const copyUrlLink = (el) => {
    const initialUrl = 'http://localhost:3000';
    if (el.type === 'comida') {
      copy(`${initialUrl}/comidas/${el.id}`);
    } else {
      copy(`${initialUrl}/bebidas/${el.id}`);
    }
    setCopyUrl({ copyRecipe: true });
    const time = 3000;
    setTimeout(() => {
      setCopyUrl({ copyRecipe: false });
    }, time);
  };

  const { copyRecipe } = copyUrl;
  const { favorite } = favorites;

  const clickFavorite = (el) => {
    setFavorites({ favorite: !favorite });
    const newFavorites = favRecipes.filter((fav) => fav !== el);
    setLocalStorage('favoriteRecipes', newFavorites);
  };

  const renderLabel = (el) => {
    let returnLabel = '';
    if (el.type === 'comida') {
      returnLabel = `${el.area}`;
    } else if (el.type === 'bebida') {
      switch (el.alcoholicOrNot) {
      case 'Alcoholic':
        returnLabel = 'Alcoholic';
        break;
      default:
        returnLabel = 'Not Alcoholic';
      }
    }
    return returnLabel;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      Essas receitas são uma delícia mesmo né??
      <main>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        {copyRecipe && <span className={ styles.copyUrl }>Link copiado!</span>}
        {favRecipes && favRecipes.map((el, index) => (
          <div key={ index } className={ styles.cardFavorite }>
            <img
              src={ el.image }
              data-testid={ `${index}-horizontal-image` }
              alt=""
            />
            <div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { renderLabel(el) }
                {' '}
                -
                {' '}
                { el.category }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{ el.name }</p>
              <div>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyUrlLink(el) }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="Compartilhar" />
                </button>
                <button
                  type="button"
                  onClick={ () => clickFavorite(el) }
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img
                    src={ favorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Favoritado"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default FavoriteRecipies;
