import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import SearchContext from './SearchContext';
import { fetchRecipes, fetchDrinksRecipes } from '../services/getApis';

function SearchProvider({ children }) {
  const [inputText, setInputText] = useState('');
  const [inputRadios, setInputRadios] = useState('ingredient');
  const [recipes, setRecipes] = useState('');
  const [drinksRecipes, setDrinksRecipes] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();

  const getRecipes = async (text, radio) => {
    setIsloading(true);
    const apiRecipes = await fetchRecipes(text, radio);
    setRecipes(apiRecipes.meals);
    if (apiRecipes.meals.length === 1) {
      history.push(`/comidas/${apiRecipes.meals[0].idMeal}`);
    }
    setIsloading(false);
  };

  const getDrinksRecipes = async (text, radio) => {
    setIsloading(true);
    const apiRecipes = await fetchDrinksRecipes(text, radio);
    setDrinksRecipes(apiRecipes.drinks);
    if (apiRecipes.drinks.length === 1) {
      history.push(`/bebidas/${apiRecipes.drinks[0].idDrink}`);
    }
    setIsloading(false);
  };

  return (
    <SearchContext.Provider
      value={ {
        inputText,
        setInputText,
        inputRadios,
        setInputRadios,
        recipes,
        isLoading,
        getRecipes,
        drinksRecipes,
        getDrinksRecipes,
      } }
    >
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
