import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const INITIAL_RECIPES = {
    meals: { results: [] },
    drinks: { results: [] },
  };

  const FAVORITES_RECIPES = {
    favRecipes: [],
  };

  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [favoriteRecipes, setFavoriteRecipes] = useState(FAVORITES_RECIPES);

  const [data, setData] = useState([]);
  const updateData = async (api) => setData(await api);

  const context = {
    recipes,
    setRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    data,
    updateData,
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
