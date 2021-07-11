import React, { createContext, useState } from 'react';
import { shape, object } from 'prop-types';
import usePersistedState from '../hooks/usePersistedState';

const INITIAL_VALUE = {
  meals: [],
  drinks: [],
  list: { meals: [], drinks: [] },
};

const INITIAL_STATE_STORAGE = { cocktails: {}, meals: {} };

export const RecipeContext = createContext();

export function RecipeContextProvider({ value = INITIAL_VALUE, children }) {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(value);
  const [searchedByCategory, setSearchedByCategory] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = usePersistedState(
    'favoriteRecipes',
    [],
  );
  const [inProgressRecipes, setInProgressRecipes] = usePersistedState(
    'inProgressRecipes',
    INITIAL_STATE_STORAGE,
  );
  const [doneRecipes, setDoneRecipes] = usePersistedState('doneRecipes', []);

  return (
    <RecipeContext.Provider
      value={ {
        recipe,
        setRecipe,
        searchedByCategory,
        setSearchedByCategory,
        favoriteRecipes,
        setFavoriteRecipes,
        doneRecipes,
        setDoneRecipes,
        inProgressRecipes,
        setInProgressRecipes,
        loading,
        setLoading,
      } }
    >
      {children}
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape(),
  value: object,
}.isRequired;
