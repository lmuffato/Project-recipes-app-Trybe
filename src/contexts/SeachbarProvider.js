import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function SearchbarProvider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState('meal');
  const [searchCategory, setSearchCategory] = useState('list');

  const contextValue = {
    mealOrDrink,
    setMealOrDrink,
    searchCategory,
    setSearchCategory,
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
