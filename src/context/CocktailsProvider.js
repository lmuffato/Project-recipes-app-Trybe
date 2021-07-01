import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';
import { ApiCocktailFirstItems, CocktailApiCategory,
  CocktailApiFilterByCategory } from '../services/theCockTailAPI';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState({});
  const [cocktailsCopy, setCocktailsCopy] = useState({});
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  const setMealsByCategories = async (string) => {
    if (currCategory === string) return setCocktails(cocktailsCopy);
    const results = await CocktailApiFilterByCategory(string);
    setCocktails(results);
  };

  useEffect(() => {
    const load = async () => {
      const result = await ApiCocktailFirstItems();
      const cocktailCategories = await CocktailApiCategory();
      const { drinks } = cocktailCategories;
      setCocktails(result);
      setCocktailsCopy(result);
      setCocktailsCategories(drinks);
    };
    load();
  }, []);

  const context = {
    cocktails,
    setCocktails,
    cocktailsCategories,
    setCurrCategory,
    setMealsByCategories,
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
