import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import ButtonFavorite from '../components/ButtonFavorite';
import ContextRecipes from '../context/ContextRecipes';
import ButtonShare from '../components/ButtonShare';
import CustonAlert from '../components/CustonAlert';
import fetchApiById from '../service/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recomendations';
import Video from '../service/Video';
import RenderProgress from '../service/RenderProgress';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { alertOn } = useContext(ContextRecipes);
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
      <ButtonShare
        idRecipe={ id }
        typeRecipe={ url }
        testid="share-btn"
      />
      {alertOn && <CustonAlert message="Link copiado!" />}
      <ButtonFavorite
        idRecipe={ id }
        dbType={ type }
        testid="favorite-btn"
      />
      <p data-testid="recipe-category">
        { url === 'comidas' ? recipe.strCategory : recipe.strAlcoholic }
      </p>
      { recipe.strMeal ? <Video recipe={ recipe } /> : null }
      <Ingredients recipe={ recipe } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Recommendations recipe={ type } />
      { RenderProgress(url, id) }
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
