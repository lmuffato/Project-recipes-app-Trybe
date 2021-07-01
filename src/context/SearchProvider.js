import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import SearchContext from './SearchContext';
import { fetchRecipes, fetchDrinksRecipes } from '../services/getApis';

function SearchProvider({ children }) {
  const [inputText, setInputText] = useState('');
  const [inputRadios, setInputRadios] = useState('ingredient');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();

  const getRecipes = async (text, radio) => {
    setIsloading(true);
    const apiRecipes = await fetchRecipes(text, radio);
    setFilteredRecipes(apiRecipes.meals);
    if (!apiRecipes.meals) {
      setFilteredRecipes([]);
    } else if (apiRecipes.meals && apiRecipes.meals.length === 1) {
      history.push(`/comidas/${apiRecipes.meals[0].idMeal}`);
    }
    setIsloading(false);
  };

  const getDrinksRecipes = async (text, radio) => {
    setIsloading(true);
    const apiRecipes = await fetchDrinksRecipes(text, radio);
    setFilteredDrinks(apiRecipes.drinks);
    if (!apiRecipes.drinks) {
      setFilteredDrinks([]);
    } else if (apiRecipes.drinks && apiRecipes.drinks.length === 1) {
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
        filteredRecipes,
        isLoading,
        getRecipes,
        filteredDrinks,
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
