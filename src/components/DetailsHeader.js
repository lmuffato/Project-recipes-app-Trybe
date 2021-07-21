import React, { useContext } from 'react';
import PropTypes from 'prop-types';

// import '../style/DetailsHeader.css';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import FoodContext from '../contexts/FoodContext';

export default function DetailsHeader({ recipe, isFood }) {
  const recipeId = isFood ? recipe.idMeal : recipe.idDrink;
  const recipeCategory = recipe.strCategory;
  const recipeName = isFood ? recipe.strMeal : recipe.strDrink;
  const recipeImage = isFood ? recipe.strMealThumb : recipe.strDrinkThumb;
  const recipeStrAlcoholic = recipe.strAlcoholic;
  const context = useContext(FoodContext);
  const { color: { colorP } } = context;
  const { color: { colorH1 } } = context;
  const { color: { colorDiv } } = context;

  return (
    <div className="details-header">
      <img
        src={ recipeImage }
        alt={ recipeName }
        data-testid="recipe-photo"
        className="details-header-img"
        style={ { backgroundColor: colorDiv } }
      />
      <div className="details-header-middle" style={ { backgroundColor: colorDiv } }>
        <h1 data-testid="recipe-title" style={ { color: colorH1 } }>
          { recipeName }
        </h1>
        <div
          className="buttons-container"
          style={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: colorDiv } }
        >
          <ShareButton recipeId={ recipeId } isFood={ isFood } />
          <FavoriteButton recipe={ recipe } isFood={ isFood } />
        </div>
      </div>
      <br />
      <p data-testid="recipe-category" style={ { color: colorP } }>
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
