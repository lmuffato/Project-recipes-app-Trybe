import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InProgressContext from './InProgressContext';

export default function InProgressProvider({ children }) {
  const [inProgressDrinks, setInProgressDrinks] = useState({});
  const [inProgressFoods, setInProgressFoods] = useState({});

  function saveInProgressToLS() {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: inProgressDrinks,
      meals: inProgressFoods,
    }));
  }

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setInProgressDrinks(inProgressRecipes.cocktails);
      setInProgressFoods(inProgressRecipes.meals);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, []);

  return (
    <InProgressContext.Provider
      value={ {
        inProgressDrinks,
        setInProgressDrinks,
        inProgressFoods,
        setInProgressFoods,
        saveInProgressToLS } }
    >
      {children}
    </InProgressContext.Provider>
  );
}

InProgressProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
