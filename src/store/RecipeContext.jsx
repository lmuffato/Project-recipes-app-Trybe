import React, { createContext, useState } from 'react';
import { shape, object } from 'prop-types';

const INITIAL_VALUE = {
  meals: [],
  drinks: [],
  list: { meals: [], drinks: [] },
};

export const RecipeContext = createContext();

export function RecipeContextProvider({ value = INITIAL_VALUE, children }) {
  const [recipe, setRecipe] = useState(value);

  return (
    <RecipeContext.Provider value={ { recipe, setRecipe } }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape(),
  value: object,
}.isRequired;
