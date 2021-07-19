import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import fetchByIdApi from '../../services/fetchApiDetails';
import Ingredients from './Ingredients';
import Recommendations from './Recommendations';
import Video from './Video';
import './recipesDetails.css';
import StartRecipeBtn from './StartRecipeBtn';
import BtnFavorite from '../RecipesProgress/BtnFavorite';
import BtnShare from '../RecipesProgress/BtnShare';

export default function RecipeDetails({ match: { params: { id }, path, url } }) {
  const { context } = useContext(AppContext);
  const { setPageOrigin, recipe, setRecipe } = context;

  useEffect(() => {
    fetchByIdApi(path.includes('/comidas') ? 'themealdb' : 'thecocktaildb', id)
      .then((recipeCrr) => {
        setRecipe(recipeCrr);
      });
  }, []);

  useEffect(() => {
    setPageOrigin(path.includes('/comidas/') ? 'themealdb' : 'thecocktaildb');
  }, [path]);

  return (

    <div className="main-container-details">

      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid="recipe-photo"
        width="100%"
        alt="recipe details"
      />
      <h2
        data-testid="recipe-title"
      >
        { recipe.strMeal || recipe.strDrink }
      </h2>
      <div className="buttons-share-favorite">
        <BtnShare url={ url } />
        <BtnFavorite id={ id } />
      </div>
      <p
        className="category-title"
        data-testid="recipe-category"
      >
        { recipe.strAlcoholic || recipe.strCategory }
      </p>
      <Video recipe={ recipe } />
      <Ingredients recipe={ recipe } />
      <h2 className="instructions">Instructions</h2>
      <p
        className="instructions"
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
      <Recommendations path={ path } />
      <StartRecipeBtn recipe={ recipe } />

    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape(
    { path: PropTypes.string,
      url: PropTypes.string,
      params: PropTypes.shape({
        id: PropTypes.string,
      }) },
  ).isRequired,
};
