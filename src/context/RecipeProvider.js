import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const contextValue = {
    recipes,
    setRecipes,
    redirect,
    setRedirect,
    favoriteRecipes,
    setFavoriteRecipes,
  };
  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeProvider;
