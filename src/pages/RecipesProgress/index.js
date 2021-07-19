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
  const { params, url: urlOrigin } = match;
  const { id } = params;
  const { context } = useContext(AppContext);
  const { setPageOrigin, pageOrigin, recipe, setRecipe } = context;
  const key = 'inProgressRecipes';
  const URL_CUT = -12;
  const url = urlOrigin.slice(0, URL_CUT);
  const [fromStorage, setFromStorage] = useState('');

  function getFromStorage() {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const result = JSON.parse(storageValue);
      const values = Object.keys(result);
      const [idValue] = values;
      setFromStorage(idValue);
    }
  }

  async function getRecipeStorage() {
    if (fromStorage && pageOrigin === id) {
      const data = await
      fetch(`https://www.${pageOrigin}.com/api/json/v1/1/lookup.php?i=${fromStorage}`);
      const results = await data.json();
      setRecipe(pageOrigin === 'themealdb' ? results.meals[0] : results.drinks[0]);
    }
    const data = await
    fetch(`https://www.${pageOrigin}.com/api/json/v1/1/lookup.php?i=${id}`);
    const results = await data.json();
    setRecipe(pageOrigin === 'themealdb' ? results.meals[0] : results.drinks[0]);
  }

  useEffect(() => {
    setPageOrigin(urlOrigin.includes('/comidas/') ? 'themealdb' : 'thecocktaildb');
  }, [urlOrigin]);

  useEffect(() => {
    getRecipeStorage();
  }, [pageOrigin, fromStorage, id]);

  useEffect(() => {
    getFromStorage();
  }, [recipe]);

  return (
    <div className="recipes-progress-container">
      <div className="recipes-progress">
        <Image src={ recipe.strMealThumb || recipe.strDrinkThumb } />

        <div className="title">
          <Title title={ recipe.strMeal || recipe.strDrink } />
          <div className="buttons-share-favorite">
            <BtnShare url={ url } />

            <BtnFavorite id={ id } />
          </div>
          <Category category={ recipe.strCategory || recipe.strAlcoholic } />

          <h2>Ingredientes</h2>
          <Ingredients recipe={ recipe } />
          <h2>Instruções</h2>
          <Instructions instruction={ recipe.strInstructions } />
        </div>

      </div>
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
