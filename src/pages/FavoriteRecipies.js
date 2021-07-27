import React from 'react';
import copy from 'clipboard-copy';
import { useStateEasyRedux, useClassState } from 'easy-redux-trybe';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { setLocalStorage, getLocalStorage } from '../helper';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import styles from '../styles/FavoritePage.module.scss';

function FavoriteRecipies() {
  const [copyUrl, setCopyUrl] = useStateEasyRedux({ name: 'copyFood' }, {});
  const [favorites, setFavorites] = useClassState({ favorite: true });
  const favRec = getLocalStorage('favoriteRecipes');
  const [stateFavorite, setStateFavorite] = useClassState({ favRecipes: favRec });
  const history = useHistory();

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
  const { favRecipes } = stateFavorite;

  const clickFavorite = (el) => {
    setFavorites({ favorite: !favorite });
    const newFavorites = favRecipes.filter((fav) => fav !== el);
    setLocalStorage('favoriteRecipes', newFavorites);
    setStateFavorite({ favRecipes: newFavorites });
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

  const renderCards = (ev) => {
    const { textContent } = ev.target;
    if (textContent === 'All') {
      setStateFavorite({ favRecipes: favRec });
    }
    if (textContent === 'Food') {
      const filterFood = favRec.filter((el) => el.type === 'comida');
      setStateFavorite({ favRecipes: filterFood });
    }
    if (textContent === 'Drinks') {
      const filterDrink = favRec.filter((el) => el.type === 'bebida');
      setStateFavorite({ favRecipes: filterDrink });
    }
  };

  const choiceRecipie = (el) => {
    if (el.type === 'comida') {
      history.push(`/comidas/${el.id}`);
    } else {
      history.push(`/bebidas/${el.id}`);
    }
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <main>
        <div className={ styles.buttonsDiv }>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ (ev) => renderCards(ev) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ (ev) => renderCards(ev) }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ (ev) => renderCards(ev) }
          >
            Drinks
          </button>
        </div>
        {copyRecipe && <span className={ styles.copyUrl }>Link copiado!</span>}
        {favRecipes && favRecipes.map((el, index) => (
          <div
            key={ el.id }
            className={ styles.cardFavorite }
          >
            <img
              src={ el.image }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => choiceRecipie(el) }
              aria-hidden="true"
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
              <p
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => choiceRecipie(el) }
                aria-hidden="true"
              >
                { el.name }
              </p>
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
