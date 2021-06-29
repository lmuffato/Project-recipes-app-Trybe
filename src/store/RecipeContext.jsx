import React, { createContext } from 'react';
import { shape } from 'prop-types';

export const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  return (
    <RecipeContext.Provider value={ {} }>{ children }</RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape().isRequired,
};
