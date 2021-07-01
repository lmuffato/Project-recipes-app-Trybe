import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';
import { ApiCocktailFirstItems, CocktailApiCategory,
  CocktailApiFilterByCategory } from '../services/theCockTailAPI';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState({});
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  useEffect(() => {
    const setMealsByCategories = async () => {
      const results = await CocktailApiFilterByCategory(currCategory);
      setCocktails(results);
    };
    setMealsByCategories();
  }, [currCategory]);

  useEffect(() => {
    const load = async () => {
      const result = await ApiCocktailFirstItems();
      const cocktailCategories = await CocktailApiCategory();
      const { drinks } = cocktailCategories;
      setCocktails(result);
      setCocktailsCategories(drinks);
    };
    load();
  }, []);

  const context = {
    cocktails,
    setCocktails,
    cocktailsCategories,
    setCurrCategory,
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
