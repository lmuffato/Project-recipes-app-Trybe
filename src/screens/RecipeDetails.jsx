import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import fetchApiById from '../service/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recomendations';
import Video from '../service/Video';
import { FavFood, FavDrink } from '../service/Favorite';
import RenderProgressFood from '../service/RenderProgress';
import RenderProgressDrink from '../service/RenderProgressDrink';
import { checkFavoriteFood, checkFavoriteDrink } from '../service/Check';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const type = pathname === `/comidas/${id}` ? 'themealdb' : 'thecocktaildb';
  const url = pathname === `/comidas/${id}` ? 'comidas' : 'bebidas';

  useEffect(() => {
    async function requestApi() {
      const request = await fetchApiById(type, id);
      return setRecipe(request);
    }
    requestApi();
  }, [type, id]);

  const verifyAlcohol = (el) => {
    if (el.strAlcoholic === 'Alcoholic') {
      return (<p>{ el.strAlcoholic }</p>);
    }
  };

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
        onClick={ () => (
          url === 'comidas' ? FavFood(recipe) : FavDrink(recipe)
        ) }
      />
      <p data-testid="recipe-category">
        { recipe.strCategory }
        { verifyAlcohol(recipe) }
      </p>
      { recipe.strMeal ? <Video recipe={ recipe } /> : null }
      <Ingredients recipe={ recipe } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommendations recipe={ type } />
      { recipe.srtMeal ? RenderProgressFood(url, id) : RenderProgressDrink(url, id) }
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
