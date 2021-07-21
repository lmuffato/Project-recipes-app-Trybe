import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import {
  checkStorageFood,
  checkStorageDrink,
  saveFavoriteDrink,
  saveFavoriteFood } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import styles from './styles.module.css';

class EmProgInfos extends React.Component {
  async onClickShare(path) {
    const p = document.createElement('p');
    const pai = document.querySelector('#share');
    p.innerText = 'Link copiado!';
    const url = `http://localhost:3000${path}`;
    pai.appendChild(p);
    await copy(url);
  }

  saveFavoriteRecipe(recipe, typeRecipe) {
    if (typeRecipe === 'comidas') {
      return saveFavoriteFood(recipe);
    }
    if (typeRecipe === 'bebidas') {
      return saveFavoriteDrink(recipe);
    }
  }

  checkFavorite(recipe) {
    if (localStorage.favoriteRecipes) {
      if (checkStorageFood(recipe) === true || checkStorageDrink(recipe === true)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  render() {
    const {
      thumbnail,
      title,
      pathname,
      category,
      instructions,
      fullRecipe,
      typeRecipe } = this.props;
    return (
      <>
        <img data-testid="recipe-photo" src={ thumbnail } alt={ title } />
        <div className={ styles.infoContainer }>
          <h1 data-testid="recipe-title">{title}</h1>
          <span data-testid="recipe-category">{category}</span>
          <p data-testid="instructions">{instructions}</p>
          <div id="share" className={ styles.iconsContainer }>
            <input
              type="image"
              data-testid="share-btn"
              src={ shareIcon }
              alt="Compartilhar receita"
              onClick={ () => this.onClickShare(pathname) }
            />
            <input
              type="image"
              data-testid="favorite-btn"
              src={ this.checkFavorite(fullRecipe) }
              alt="favoritar receita"
              onClick={ () => this.saveFavoriteRecipe(fullRecipe, typeRecipe) }
            />
          </div>
        </div>
      </>
    );
  }
}

EmProgInfos.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  pathname: PropTypes.string,
  instructions: PropTypes.string,
}.isRequired;

export default EmProgInfos;
