import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState([]);
  const context = {
    cocktails,
    setCocktails,
  };
  const { children } = props;
  return (
    <CocktailsContext.Provider value={ context }>
      {children}
    </CocktailsContext.Provider>
  );
}

CocktailsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default CocktailsProvider;
