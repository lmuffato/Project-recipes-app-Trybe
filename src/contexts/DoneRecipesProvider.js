import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DoneRecipesContext from './DoneRecipesContext';

export default function DoneRecipesProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, [setDoneRecipes]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') && doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  }, [doneRecipes]);

  return (
    <DoneRecipesContext.Provider value={ { doneRecipes, setDoneRecipes } }>
      {children}
    </DoneRecipesContext.Provider>
  );
}

DoneRecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
