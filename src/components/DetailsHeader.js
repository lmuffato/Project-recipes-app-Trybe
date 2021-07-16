import React from 'react';
import PropTypes from 'prop-types';

import '../style/DetailsHeader.css';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function DetailsHeader({ recipe, isFood }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;
  const recipeCategory = recipe.strCategory;
  const recipeName = isFood ? recipe.strMeal : recipe.strDrink;
  const recipeImage = isFood ? recipe.strMealThumb : recipe.strDrinkThumb;
  const recipeStrAlcoholic = recipe.strAlcoholic;

  return (
    <div>
      <img
        src={ recipeImage }
        alt={ recipeName }
        data-testid="recipe-photo"
        className="details-header-img"
      />
      <div className="details-header-middle">
        <h1 data-testid="recipe-title">
          { recipeName }
        </h1>
        <div className="buttons-container">
          <ShareButton recipeId={ recipeId } isFood={ isFood } />
          <FavoriteButton recipe={ recipe } isFood={ isFood } />
        </div>
      </div>
      <br />
      <p data-testid="recipe-category">
        Category:
        {' '}
        { recipeCategory }
        <br />
        { recipeStrAlcoholic }
      </p>
    </div>
  );
}

DetailsHeader.propTypes = {
  recipes: PropTypes.shape({}),
  isFood: PropTypes.bool,
  isDrink: PropTypes.bool,
}.isRequired;
