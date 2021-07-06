import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  const context = {
    recipesFoods,
    recipesDrinks,
    setRecipesFoods,
    setRecipesDrinks,
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
