import React, { useLocation, useEffect, useState } from 'react';
import fetchApiById from '../service/fetchApiDetails';
//import Ingredients from './Ingredients';
import Recommendations from './Recommendations';
import Video from '../service/Video';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const type = pathname === '/comidas' ? 'themealdb' : 'thecocktaildb' ;

  useEffect(() => {
    async function requestApi() {
      const request = await fetchApiById(type, id);
      return setRecipe(request);
    }
    requestApi();
  }, []);

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
      <button type="button" onClick="">
        <img src={} alt="share button" data-testid="share-btn" />
      </button>
      <button type="button" onClick="">
        <img src={} alt="favorite button" data-testid="favorite-btn" />
      </button>
      <p data-testid="recipe-category">
        { recipe.strCategory }
      </p>
      <Video recipe={ recipe } />
      <Ingredients recipe={ recipe } />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommendations recipe={ type } />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default RecipeDetails;
