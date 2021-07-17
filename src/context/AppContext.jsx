import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipesApi, fetchCategoriesApi } from '../services/fetchApiMain';

export const AppContext = createContext();
export default function AppProvider({ children }) {
  // header States
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pageOrigin, setPageOrigin] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [toStorage, setToStorage] = useState('');
  const [toDoneStorage, setToDoneStorage] = useState([]);
  const [checkedState, setCheckedState] = useState(true);
  const [recipe, setRecipe] = useState('');
  const [byIngredients, setByIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const NUM_RECIPES_SHOWN = 12;
  const NUM_CATEG_SHOWN = 5;
  const context = {
    displaySearchBar,
    setDisplaySearchBar,
    searchValue,
    setSearchValue,
    inputValue,
    setInputValue,
    pageOrigin,
    setPageOrigin,
    recipesList,
    setRecipesList,
    categoriesList,
    setCategoriesList,
    toStorage,
    checkedState,
    setCheckedState,
    recipe,
    setRecipe,
    toDoneStorage,
    byIngredients,
    setByIngredients,
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    const inProgressStorage = [{
      id: recipe.idMeal || recipe.idDrink,
      type: pageOrigin.includes('themealdb') ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    }];
    setToStorage(inProgressStorage);
  }, [recipe, pageOrigin]);

  // ideia para criar o formato da data
  // https://qastack.com.br/programming/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setToDoneStorage(doneRecipes);
  }, [recipe, pageOrigin]);

  useEffect(() => {
    if (pageOrigin !== '') {
      fetchCategoriesApi(pageOrigin)
        .then((categories) => {
          categories.splice(NUM_CATEG_SHOWN, categories.length - 1);
          setCategoriesList(categories);
        });
    }
  }, [pageOrigin]);

  useEffect(() => {
    if (pageOrigin !== '') {
      setIsLoading(true);
      fetchRecipesApi(pageOrigin)
        .then((recipes) => {
          recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
          setRecipesList(recipes);
        });
      setIsLoading(false);
    }
    return (() => {
      setIsLoading(false);
    });
  }, [pageOrigin]);

  return (
    <AppContext.Provider value={ { context } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
