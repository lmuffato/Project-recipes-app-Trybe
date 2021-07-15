import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import fetchApiById from '../service/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recomendations';
import Video from '../service/Video';
import contexteRecipe from '../context/ContextRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveFavoriteFood, saveFavoriteDrink, checkStorageFood, checkStorageDrink } from '../service/Favorite';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const { doneRecipes, inProgressRecipes } = useContext(contexteRecipe);
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const type = pathname === `/comidas/${id}` ? 'themealdb' : 'thecocktaildb';
  const url = pathname === `/comidas/${id}` ? 'comidas' : 'bebidas';

  const startRecipe = {
    position: 'fixed',
    bottom: '0px',
  };

  useEffect(() => {
    async function requestApi() {
      const request = await fetchApiById(type, id);
      return setRecipe(request);
    }
    requestApi();
  }, [type, id]);

  function checkFavoriteFood(recip) {
    if (localStorage.favoriteRecipes) {
      if (checkStorageFood(recip) === true) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  function checkFavoriteDrink(recip) {
    if (localStorage.favoriteRecipes) {
      if (checkStorageDrink(recip) === true) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  function alreadyDone() {
    let doneFlag = false;
    doneRecipes.forEach((recip) => {
      if (recip.id === id) doneFlag = true;
    });
    return doneFlag;
  }

  function inProgress() {
    let progressFlag = false;
    if (inProgressRecipes.length !== 0) {
      progressFlag = (inProgressRecipes.cocktails[id] !== null);
    }
    return progressFlag;
  }

  function renderProgress() {
    if (alreadyDone()) {
      return (<div>Receita já feita</div>);
    }
    if (inProgress()) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ startRecipe }
        >
          Continuar Receita
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ startRecipe }
        onClick={ () => history.push(`/${url}/${id}/in-progress`) }
      >
        iniciar receita
      </button>
    );
  }
  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid="recipe-photo"
        width="200px"
        alt="recipe details"
      />
      <h2 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h2>
      <button type="button" data-testid="share-btn">
        compartilhar
      </button>
      <input
        type="image"
        data-testid="favorite-btn"
        src={ url === 'comidas' ? checkFavoriteFood(recipe) : checkFavoriteDrink(recipe) }
        alt="favoritar receita"
        className="fav-btn"
        onClick={ () => (url === 'comidas' ? saveFavoriteFood(recipe) : saveFavoriteDrink(recipe)) }
      />
      <p data-testid="recipe-category">
        { recipe.strCategory }
      </p>
      { recipe.strMeal ? <Video recipe={ recipe } /> : null }
      <Ingredients recipe={ recipe } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommendations recipe={ type } />
      { renderProgress() }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
