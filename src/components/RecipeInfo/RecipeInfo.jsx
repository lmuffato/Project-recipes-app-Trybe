import React from 'react';
import PropTypes from 'prop-types';

function RecipeInfo({ recipeName, recipeThumb, children }) {
  return (
    <div className="componente1">
      <div className="recipe-info">
        <h2 data-testid="recipe-title">{ recipeName }</h2>
        <div>{ children }</div>
      </div>
      <div className="img-container">
        <img src={ recipeThumb } alt="Foto da receita" data-testid="recipe-photo" />
      </div>
    </div>
  );
}

export default RecipeInfo;

RecipeInfo.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeThumb: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
