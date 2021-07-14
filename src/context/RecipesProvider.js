import React, { useState } from 'react';
import { element } from 'prop-types';
import RecipeContext from './RecipesContext';
import { getMeals, getCocktails } from '../services/api';

function checkLocalStorage(doneOrFavoriteRecipes) {
  const recipesArray = JSON.parse(localStorage.getItem(doneOrFavoriteRecipes));
  if (recipesArray !== null) {
    return recipesArray;
  }
  return [];
}

function RecipeProvider({ children }) {
  const filtersInitialState = {
    parameter: 'name',
    search: '',
  };
  const [filters, setFilters] = useState(filtersInitialState);
  const [filtersDone, setFiltersDone] = useState({ type: 'all' });
  const [filtersFavorite, setFiltersFavorite] = useState({ type: 'all' });
  const [drinkData, setDrinkData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(checkLocalStorage('doneRecipes'));
  const [favoriteRecipes,
    setFavoriteRecipes] = useState(checkLocalStorage('favoriteRecipes'));
  const [foodDataNoFilter, setFoodDataNoFilter] = useState([]);
  const [drinkDataNoFilter, setDrinkDataNoFilter] = useState([]);

  const [foodDataIngredientFilter, setFoodDataIngredientFilter] = useState([]);
  const [drinkDataIngredientFilter, setDrinkDataIngredientFilter] = useState([]);

  const buttonsInitialState = {
    buttonFilter0: false,
    buttonFilter1: false,
    buttonFilter2: false,
    buttonFilter3: false,
    buttonFilter4: false,
  };

  const [stateButtonsFilter, setStateButtonsFilter] = useState(buttonsInitialState);

  const maxObjRetrieve = 12;

  async function fetchMeals() {
    const { parameter, search } = filters;
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setFoodData([]);
      return;
    }
    if (meals.length > maxObjRetrieve) {
      setFoodData(meals.slice(0, maxObjRetrieve));
      return;
    }
    setFoodData(meals);
  }

  async function fetchCocktails() {
    const { parameter, search } = filters;
    const { drinks } = await getCocktails(parameter, search);
    if (drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setDrinkData([]);
      return;
    }
    if (drinks.length > maxObjRetrieve) {
      setDrinkData(drinks.slice(0, maxObjRetrieve));
      return;
    }
    setDrinkData(drinks);
  }

  async function fetchMealsNoFilter(parameter, search) {
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      setFoodDataNoFilter([]);
      // setFoodDataIngredientFilter([]);
      setFoodData([]);
      return;
    }
    if (meals.length > maxObjRetrieve) {
      setFoodDataNoFilter(meals.slice(0, maxObjRetrieve));
      // setFoodDataIngredientFilter(meals.slice(0, maxObjRetrieve));
      setFoodData(meals.slice(0, maxObjRetrieve));
      return;
    }
    setFoodDataNoFilter(meals);
    setFoodData(meals);
  }

  async function fetchCocktailsNoFilter(parameter, search) {
    const { drinks } = await getCocktails(parameter, search);
    if (drinks === null) {
      setDrinkDataNoFilter([]);
      setDrinkDataIngredientFilter([]);
      return;
    }
    if (drinks.length > maxObjRetrieve) {
      setDrinkDataNoFilter(drinks.slice(0, maxObjRetrieve));
      setDrinkDataIngredientFilter(drinks.slice(0, maxObjRetrieve));
      return;
    }
    setDrinkDataNoFilter(drinks);
    setDrinkDataIngredientFilter(drinks);
  }

  const consumer = {
    fetchMeals,
    fetchCocktails,
    filters,
    filtersDone,
    setFiltersDone,
    filtersFavorite,
    setFiltersFavorite,
    setFilters,
    drinkData,
    foodData,
    setFoodData,
    setDrinkData,
    stateButtonsFilter,
    setStateButtonsFilter,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    fetchMealsNoFilter,
    fetchCocktailsNoFilter,
    foodDataNoFilter,
    setFoodDataNoFilter,
    drinkDataNoFilter,
    setDrinkDataNoFilter,
    foodDataIngredientFilter,
    setFoodDataIngredientFilter,
    drinkDataIngredientFilter,
    setDrinkDataIngredientFilter,
  };

  return (
    <RecipeContext.Provider value={ { ...consumer } }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: element.isRequired,
};

export default RecipeProvider;
