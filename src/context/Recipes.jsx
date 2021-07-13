import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { getRecipes } from '../services/recipesData';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titlePage, setTitlePage] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const { location, push: historyPush } = useHistory();

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
      setCurrentFilter('All');
    }
  }, []);

  async function switchFilters(filter, event) {
    let results = [];
    switch (filter.type) {
    case 'category': {
      if (currentFilter.category !== filter.content && filter.content !== 'All') {
        results = await getRecipes(location.pathname, { category: filter.content });
        setCurrentFilter({ category: filter.content });
      } else {
        if (event) {
          event.target.checked = false;
        }
        results = await getRecipes(location.pathname);
        results = results.list;
        setCurrentFilter({ category: 'All' });
      }
      break;
    }

    case 'name': {
      results = await getRecipes(location.pathname, { name: filter.content });
      setCurrentFilter({ name: filter.content });
      break;
    }

    case 'ingredient': {
      results = await getRecipes(location.pathname, { ingredient: filter.content });
      setCurrentFilter({ ingredient: filter.content });
      break;
    }

    case 'firstletter': {
      if (filter.content.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      results = await getRecipes(location.pathname, { firstletter: filter.content });
      setCurrentFilter({ firstletter: filter.content });
      break;
    }

    default: {
      results = await getRecipes(location.pathname);
      results = results.list;
      setCurrentFilter({ category: 'All' });
      break;
    }
    }
    return results;
  }

  async function filterRecipe(filter, event) {
    const recipesLimit = 12;
    try {
      const results = await switchFilters(filter, event);
      if (results.length === 1) {
        historyPush(`${location.pathname}/${results[0].id}`);
      }

      setRecipes(results.slice(0, recipesLimit));
    } catch (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  const value = {
    recipes,
    categories,
    titlePage,
    filterRecipe,
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
