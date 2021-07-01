import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';
import { ApiCocktailFirstItems } from '../services/theCockTailAPI';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState({});

  useEffect(() => {
    const load = async () => {
      const result = await ApiCocktailFirstItems();
      setCocktails(result);
    };
    load();
  }, []);

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
