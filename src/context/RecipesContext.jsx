import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext({});

function RecipesContextProvider({ children }) {
  const [recipesContext, setRecipesContext] = useState({});
  const [prevFetchUrl, setPrevUrl] = useState('');
  // const [currentType, setCurrentType] = useState('meals');
  const contextValue = { recipesContext, setRecipesContext, prevFetchUrl, setPrevUrl };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesContextProvider;
