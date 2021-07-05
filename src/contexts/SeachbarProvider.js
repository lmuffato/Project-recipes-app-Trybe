import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function SearchbarProvider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState('meal');

  const contextValue = {
    mealOrDrink,
    setMealOrDrink,
  };

  console.log(`SearchbarProvider: ${mealOrDrink}`);

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
