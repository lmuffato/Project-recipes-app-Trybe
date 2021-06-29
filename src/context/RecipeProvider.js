import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [categories, initialRecipes] = useState({
    categories: [],
    initialRecipes: [],
  });
  return (
    <RecipeContext.Provider value={ { categories, initialRecipes } }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeProvider;
