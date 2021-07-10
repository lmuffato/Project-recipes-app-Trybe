import React, { useState } from 'react';
import { element } from 'prop-types';

import RecipesContext from './recipesContext';
import {
  filterMethodFoods,
  filterMethodDrinks,
  alertRequestApi,
} from '../../utils/functions';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [toggle, setToggle] = useState('');

  async function getSubmitApiFoods(text, ingredients, name, firtsLetter) {
    const requestApi = filterMethodFoods(text, ingredients, name, firtsLetter);
    if (requestApi.validFirstLetter) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (text) {
      const data = await requestApi.get(text);
      if (!data.meals) return alertRequestApi();
      setTypeFilter('Meal');
      setRecipes(data.meals);
    }
  }

  async function getSubmitApiDrinks(text, ingredients, name, firtsLetter) {
    const requestApi = filterMethodDrinks(text, ingredients, name, firtsLetter);
    if (requestApi.validFirstLetter) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (text) {
      const data = await requestApi.get(text);
      if (!data.drinks) return alertRequestApi();
      setTypeFilter('Drink');
      setRecipes(data.drinks);
    }
  }

  async function fetchRecipes(pathName) {
    const str = pathName === '/comidas' ? 'themealdb' : 'thecocktaildb';
    const property = pathName === '/comidas' ? 'meals' : 'drinks';
    const type = pathName === '/comidas' ? 'Meal' : 'Drink';
    // const maxMeal = 12;
    const fetchApi = await fetch(`https://www.${str}.com/api/json/v1/1/search.php?s=`);
    const result = await fetchApi.json();
    // const slice = result[property].slice(0, maxMeal);
    setTypeFilter(type);
    setRecipes(result[property]);
    setLoading(false);
  }

  async function fetchCategoryRecipes(pathName) {
    const str = pathName === '/comidas' ? 'themealdb' : 'thecocktaildb';
    const property = pathName === '/comidas' ? 'meals' : 'drinks';
    const maxCategory = 5;
    const fetchApi = await fetch(`https://www.${str}.com/api/json/v1/1/list.php?c=list`);
    const result = await fetchApi.json();
    const slice = result[property].slice(0, maxCategory);
    setCategorys(slice);
  }

  async function filterByCategory(category, pathName) {
    const property = pathName === '/comidas' ? 'meals' : 'drinks';
    const type = pathName === '/comidas' ? 'Meal' : 'Drink';
    const str = pathName === '/comidas' ? 'themealdb' : 'thecocktaildb';
    // const maxMeal = 12;
    if (category === toggle) {
      return fetchRecipes(pathName);
    }
    setToggle(category);
    setLoading(true);
    const fetchApi = await fetch(`https://www.${str}.com/api/json/v1/1/filter.php?c=${category}`);
    const result = await fetchApi.json();
    // const newdata = result[property];
    // const slice = newdata.slice(0, maxMeal);
    setTypeFilter(type);
    setRecipes(result[property]);
    setLoading(false);
  }

  const stateRecipes = {
    recipes,
    typeFilter,
    getSubmitApiDrinks,
    getSubmitApiFoods,
    loading,
    categorys,
    fetchRecipes,
    fetchCategoryRecipes,
    filterByCategory,
  };

  return (
    <RecipesContext.Provider value={ { ...stateRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: element.isRequired,
};

export default RecipesProvider;
