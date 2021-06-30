import React, { createContext, useState } from 'react';
import { shape } from 'prop-types';

export const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipe, setRecipe] = useState();

  return (
    <RecipeContext.Provider value={ { recipe, setRecipe } }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape().isRequired,
};
