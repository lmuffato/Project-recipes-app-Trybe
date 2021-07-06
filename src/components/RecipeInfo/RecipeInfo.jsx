import React from 'react';
import PropTypes from 'prop-types';
import shareIconImg from '../../images/shareIcon.svg';
import favoriteIconImg from '../../images/whiteHeartIcon.svg';

function RecipeInfo({ recipeName, recipeThumb, children }) {
  return (
    <div className="componente1">
      <div className="img-container">
        <img src={ recipeThumb } alt="Foto da receita" data-testid="recipe-photo" />
      </div>
      <div className="recipe-info">
        <h2 data-testid="recipe-title">{ recipeName }</h2>
        <div className="icons">
          <img src={ shareIconImg } alt="ícone de compartilhar" data-testid="share-btn" />
          <img src={ favoriteIconImg } alt="" data-testid="favorite-btn" />
        </div>
      </div>
      <div>{ children }</div>
    </div>
  );
}

export default RecipeInfo;

RecipeInfo.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeThumb: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired,
};
