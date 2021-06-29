import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const context = {};
  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
