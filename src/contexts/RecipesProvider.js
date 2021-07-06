import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [type, setType] = useState(null);
  const [splitEnd, setSplitEnd] = useState(null);
  // const [endpointMealOrDrink, setEndpointMealOrDrink] = useState(null);
  // const [endpointCategories, setEndpointCategories] = useState(null);
  // const [endpointCategory, setEndpointCategory] = useState(null);
  // const [lastRecipe, setLastRecipe] = useState(null);
  // const [lastCategory, lastCategory] = useState(null);
  // const [] = useState(null);
  // const [] = useState(null);
  // const [] = useState(null);
  // const [] = useState(null);

  // const lastRecipe = 12;
  // const lastCategory = 5;

  // const endopoints = {
  //   endpointMealOrDrink: `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
  //   lastRecipe: 12,
  //   endpointCategories: `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`,
  //   lastCategory: 5,
  //   endpointCategory: `www.the${type}db.com/api/json/v1/1/filter.php?c=Seafood`,
  // };

  const contextValue = {
    states: {
      type,
      splitEnd,
      // endpointMealOrDrink,
      // endpointCategories,
      // endpointCategory
    },
    setStates: {
      setType,
      setSplitEnd,
      // setEndpointMealOrDrink,
      // setEndpointCategories,
      // setEndpointCategory,
    },
  };

  // console.log(`RecipesProvider: ${mealOrDrink}`);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
