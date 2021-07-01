import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const FilteredRecipesContext = createContext({});

function FilteredRecipesContextProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const contextValue = {
    filteredRecipes,
    setFilteredRecipes };

  return (
    <FilteredRecipesContext.Provider value={ contextValue }>
      { children }
    </FilteredRecipesContext.Provider>
  );
}

FilteredRecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilteredRecipesContextProvider;
