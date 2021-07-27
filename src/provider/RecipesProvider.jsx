import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [isExploring, setExploring] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const context = {
    recipesFoods,
    recipesDrinks,
    isExploring,
    isLoading,
    setRecipesFoods,
    setRecipesDrinks,
    setExploring,
    setLoading,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
