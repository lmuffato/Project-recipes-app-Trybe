import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const INITIAL_RECIPES = {
    meals: {
      params: { query: '', type: '' },
      results: [],
    },
    drinks: {
      params: { query: '', type: '' },
      results: [],
    },
    isLoading: false,
  };

  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const context = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
