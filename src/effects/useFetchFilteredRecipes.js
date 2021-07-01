// import { useState, useEffect, useContext } from 'react';
// import { RecipesContext } from '../context/RecipesContext';

import useFilteredRecipes from '../hooks/useFilteredRecipes';

const MAX_RECIPES = 12;

function useFetchFilteredRecipes(type) {
  // const typeURL = type === 'meals' ? '' : '';
  const { filteredRecipes,
    setFilteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    const fetchFilteredMealRecipes = async (endpoint) => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        const limitedData = {
          ...data,
          [type]: data[type].slice(0, MAX_RECIPES),
        };
        setFilteredRecipes(limitedData);
        // setar no estado de filtro
      } catch (err) {
        throw new Error(err);
      }
    };
  }, [type]);

  const handleMealFilterType = (filterType, query) => {
    const endpointMealIngr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    const endpointMealName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const endpointMealFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
    switch (filterType) {
    case 'ingredient':
      fetchFilteredMealRecipes(endpointMealIngr);
      break;
    case 'first-letter':
      if (query.length > 1) {
        // incluir alert
      } else {
        fetchFilteredMealRecipes(endpointMealFirstLetter);
      }
      break;
    case 'name':
      fetchFilteredMealRecipes(endpointMealName);
      break;
    default:
      break;
    }
  };

  // const alertMsg = () => alert.show('Sua busca deve conter somente 1 (um) caractere');
}

export default useFetchFilteredRecipes;
