import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function SearchbarProvider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [idMeal, setIdMeal] = useState();
  const [idDrink, setIdDrink] = useState();

  const contextValue = {
    mealOrDrink,
    setMealOrDrink,
    recipes,
    setRecipes,
    idDrink,
    setIdDrink,
    idMeal,
    setIdMeal,
  };

  return (
    <SearchbarContext.Provider value={ contextValue }>
      {children}
    </SearchbarContext.Provider>
  );
}

SearchbarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SearchbarProvider;
