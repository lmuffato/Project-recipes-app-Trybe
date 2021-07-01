import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipesApi, fetchCategoriesApi } from '../services/fetchApiMain';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // header States
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pageOrigin, setPageOrigin] = useState('themealdb');
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
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
  };

  useEffect(() => {
    fetchCategoriesApi(pageOrigin)
      .then((categories) => {
        categories.splice(NUM_CATEG_SHOWN, categories.length - 1);
        setCategoriesList(categories);
      });
  }, []);

  useEffect(() => {
    fetchRecipesApi(pageOrigin)
      .then((recipes) => {
        recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
        setRecipesList(recipes);
      });
  }, []);

  return (
    <AppContext.Provider value={ { context } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
