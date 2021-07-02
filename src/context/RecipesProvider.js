import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { getDrinks, getMeals } from '../services/fetchRecipes';

function RecipesProvider({ children }) {
  const INITIAL_RECIPES = {
    meals: { results: [] },
    drinks: { results: [] },
    isLoading: false,
  };

  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const context = {
    recipes,
    setRecipes,
  };

  useEffect(() => {
    getMeals().then((response) => {
      getDrinks().then((result) => {
        setRecipes({
          meals: { results: response },
          drinks: { results: result },
          isLoading: false,
        });
      });
    });
  }, []);

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
