import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import getRecipes from '../services/recipesData';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titlePage, setTitlePage] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const { location } = useHistory();

  // async function loadRecipes(pathname) {
  //   const recipesLimit = 12;
  //   const categoriesLimit = 5;
  //   const results = await getRecipes(pathname);
  //   if (results) {
  //     setRecipes(results.list.slice(0, recipesLimit));
  //     setCategories(results.categories.slice(0, categoriesLimit));
  //     setTitlePage(results.titlePage);
  //   }
  // }

  const loadRecipes = useCallback(async (pathname) => {
    const recipesLimit = 12;
    const categoriesLimit = 5;
    const results = await getRecipes(pathname);
    if (results) {
      setRecipes(results.list.slice(0, recipesLimit));
      setCategories(results.categories.slice(0, categoriesLimit));
      setTitlePage(results.titlePage);
    }
  }, []);

  async function filterByCategory(categoryName, { target }) {
    let results = [];
    const recipesLimit = 12;

    if (currentFilter !== categoryName) {
      results = await getRecipes(location.pathname, categoryName);
      setCurrentFilter(categoryName);
    } else {
      target.checked = false;
      results = await getRecipes(location.pathname);
      results = results.list;
      setCurrentFilter('');
    }

    setRecipes(results.slice(0, recipesLimit));
  }

  const value = {
    recipes,
    categories,
    titlePage,
    filterByCategory,
    loadRecipes,
  };

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
