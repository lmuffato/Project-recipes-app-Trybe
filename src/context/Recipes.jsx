import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import getRecipes from '../services/recipesData';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titlePage, setTitlePage] = useState('');
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    async function loadRecipes() {
      const recipesLimit = 12;
      const categoriesLimit = 5;
      const results = await getRecipes(pathname);
      setRecipes(results.list.slice(0, recipesLimit));
      setCategories(results.categories.slice(0, categoriesLimit));
      setTitlePage(results.titlePage);
    }

    loadRecipes();
  }, [pathname]);

  const value = {
    recipes,
    categories,
    titlePage,
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
