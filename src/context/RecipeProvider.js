import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { requestMeals } from '../services/apiRequests';

import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [redirect, setRedirect] = useState(null);

  // async function fetchMeals() {
  //   setIsLoading(true);
  //   const meals = await requestMeals();
  //   setRecipes(meals);
  //   setIsLoading(false);
  // }

  const contextValue = {
    recipes,
    setRecipes,
    // fetchMeals,
    // isLoading,
    redirect,
    setRedirect,
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
