/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import Title from './Title';
import BtnShare from './BtnShare';
import BtnFavorite from './BtnFavorite';
import Category from './Category';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { AppContext } from '../../context/AppContext';
import BtnFinishRecipe from './BtnFinishRecipe';

export default function RecipesProgress({ match }) {
  const { params, url } = match;
  const { id: idOrigin } = params;
  const { context } = useContext(AppContext);
  const { setPageOrigin, pageOrigin } = context;
  const [recipeInProgress, setRecipeInProgress] = useState('');
  const key = 'inProgressRecipes';
  const [fromStorage, setFromStorage] = useState('');

  function getFromStorage() {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const result = JSON.parse(storageValue);
      const values = Object.keys(result);
      const [id] = values;
      setFromStorage(id);
    }
  }

  async function getRecipeStorage() {
    if (fromStorage && pageOrigin === idOrigin) {
      const data = await
      fetch(`https://www.${pageOrigin}.com/api/json/v1/1/lookup.php?i=${fromStorage}`);
      const results = await data.json();
      return setRecipeInProgress(results.meals || results.drinks);
    }
    const data = await
    fetch(`https://www.${pageOrigin}.com/api/json/v1/1/lookup.php?i=${idOrigin}`);
    const results = await data.json();
    return setRecipeInProgress(results.meals || results.drinks);
  }

  useEffect(() => {
    console.log(match);
    setPageOrigin(url.includes('/comidas/') ? 'themealdb' : 'thecocktaildb');
  }, []);

  useEffect(() => {
    getRecipeStorage();
  }, [pageOrigin, fromStorage]);

  useEffect(() => {
    getFromStorage();
  }, [recipeInProgress]);

  return (
    <div>
      {recipeInProgress && recipeInProgress.map((recipe, index) => (
        <div key={ index } className="recipes-progress">
          <Image src={ recipe.strMealThumb || recipe.strDrinkThumb } />

          <div className="title">
            <Title title={ recipe.strMeal || recipe.strDrink } />
            <BtnShare url={ url } />
            <BtnFavorite />
            <Category category={ recipe.strCategory || recipe.strAlcoholic } />

            <h2>Ingredientes</h2>
            <Ingredients recipe={ recipe } />
            <h2>Instruções</h2>
            <Instructions instruction={ recipe.strInstructions } />
          </div>
        </div>

      ))}
      <BtnFinishRecipe />

    </div>
  );
}

RecipesProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
