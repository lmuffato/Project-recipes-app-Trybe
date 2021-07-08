import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CocktailsContext from './CocktailsContext';
import { ApiCocktailFirstItems, ApiDetailsById,
  ApiRandom, CocktailApiCategory,
  CocktailApiFilterByCategory } from '../services/theCockTailAPI';

function CocktailsProvider(props) {
  const [cocktails, setCocktails] = useState({});
  const [cocktailsCopy, setCocktailsCopy] = useState({});
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [currCategoryId, setCurrCategoryId] = useState('');
  const [currCocktail, setCurrCocktail] = useState({});
  const [currIngredients, setCurrIngredients] = useState([]);
  const history = useHistory();

  const handleRandomDrinkDetails = async () => {
    const result = await ApiRandom();
    const { drinks } = result;
    const [drink] = drinks;
    const { idDrink } = drink;
    history.push(`/bebidas/${idDrink}`);
  };

  useEffect(() => {
    if (!currCategoryId) return;
    const getCurrCocktail = async () => {
      const recipe = await ApiDetailsById(currCategoryId);
      const { drinks } = recipe;
      const [currDrink] = drinks;
      setCurrCocktail(currDrink);
    };
    getCurrCocktail();
    history.push(`bebidas/${currCategoryId}`);
  }, [currCategory, currCategoryId]);

  const setCocktailsByCategories = async (string) => {
    if (currCategory === string || string === 'All') return setCocktails(cocktailsCopy);
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
    setCocktailsByCategories,
    currCocktail,
    setCurrCategoryId,
    handleRandomDrinkDetails,
    currIngredients,
    setCurrIngredients,
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
