import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from './SearchbarContext';

function Provider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState('meal');

  const contextValue = {
    mealOrDrink,
    setMealOrDrink,
  };

  return (
    <SearchbarContext.Provider value={ contextValue }>
      {children}
    </SearchbarContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
