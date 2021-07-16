import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesInProgressContext = createContext({});

export default function RecipesInProgressContextProvider({ children }) {
  // const [recipesInProgress, setRecipesInProgress] = useState({});

  const [cocktails, setCocktailsIngredients] = useState({});
  const [meals, setMealsIngredients] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const contextValue = {
    cocktails,
    setCocktailsIngredients,
    meals,
    setMealsIngredients,
    isDisabled,
    setIsDisabled,
  };
  return (
    <RecipesInProgressContext.Provider value={ contextValue }>
      {children}
    </RecipesInProgressContext.Provider>
  );
}

RecipesInProgressContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
