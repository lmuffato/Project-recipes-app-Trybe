import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import fetchApiById from '../service/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recomendations';
import Video from '../service/Video';
import setFavoriteLocalStorage from '../service/setFavoriteLocalStorage';
import setDoneRecipesLocalStorage from '../service/setDoneRecipeLocalStorage';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const type = pathname === `/comidas/${id}` ? 'themealdb' : 'thecocktaildb';
  const url = pathname === `/comidas/${id}` ? 'comidas' : 'bebidas';

  useEffect(() => {
    async function requestApi() {
      const request = await fetchApiById(type, id);
      return setRecipe(request);
    }
    requestApi();
  }, [type, id]);

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
      <button
        onClick={ () => setFavoriteLocalStorage(type, id) }
        type="button"
      >
        favoritar
      </button>
      <button
        onClick={ () => setDoneRecipesLocalStorage(type, id) }
        type="button"
      >
        marcar como feito
      </button>
      <p data-testid="recipe-category">
        { recipe.strCategory }
      </p>
      { recipe.strMeal ? <Video recipe={ recipe } /> : null }
      <Ingredients recipe={ recipe } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommendations recipe={ type } />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-button"
        onClick={ () => history.push(`/${url}/${id}/in-progress`) }
      >
        iniciar receita
      </button>
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
