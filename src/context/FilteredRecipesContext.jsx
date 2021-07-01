import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const FilteredRecipesContext = createContext({});

const MAX_RECIPES = 12;
// const INITIAL_STATE = {
//   radioValue: '',
//   inputSearch: '',
// };

function FilteredRecipesContextProvider({ children }) {
  // const typeURL = type === 'meals' ? '' : '';
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchBarFilters, setSearchBarFilters] = useState([]);

  const fetchFilteredMealRecipes = async (endpoint, type) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      const limitedData = {
        ...data,
        [type]: data[type].slice(0, MAX_RECIPES),
      };
      console.log(Object.keys(limitedData));
      if (limitedData[type]) setFilteredRecipes(limitedData[type]);
    // setar no estado de filtro
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleMealFilterType = (filterType, query, type) => {
    const endpointMealIngr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    const endpointMealName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const endpointMealFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
    switch (filterType) {
    case 'ingredient':
      fetchFilteredMealRecipes(endpointMealIngr, type);
      break;
    case 'first-letter':
      if (query.length > 1 || query.trim() === '') {
        // incluir alert
      } else {
        fetchFilteredMealRecipes(endpointMealFirstLetter, type);
      }
      break;
    case 'name':
      fetchFilteredMealRecipes(endpointMealName, type);
      break;
    default:
      break;
    }
  };

  const handleDrinksFilterType = (filterType, query, type) => {
    const cocktailEndpointIngr = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
    const cocktailEndpointName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
    const cocktailEndpointFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;

    switch (filterType) {
    case 'ingredient':
      fetchFilteredMealRecipes(cocktailEndpointIngr, type);
      break;
    case 'first-letter':
      if (query.length > 1 || query.trim() === '') {
        // chamar a função do alert
      } else {
        fetchFilteredMealRecipes(cocktailEndpointFirstLetter, type);
      }
      break;
    case 'name':
      fetchFilteredMealRecipes(cocktailEndpointName, type);
      break;
    default:
      break;
    }
  };

  // vai ser chamada no useEffect --> array de filtros como dependência
  const getFilteredRecipes = (type) => {
    if (searchBarFilters.length > 0) {
      searchBarFilters.forEach((item) => {
        const { inputSearch, radioValue } = item;
        if (type === 'meals') {
          handleMealFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
        }
        if (type === 'drinks') {
          handleDrinksFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
        }
        // passar os dois como parametros da função
        // fazer o if
      });
      setSearchBarFilters([]);
    }
  };

  const contextValue = {
    filteredRecipes,
    setFilteredRecipes,
    searchBarFilters,
    setSearchBarFilters,
    getFilteredRecipes }; // arr[arr.length - 1]

  return (
    <FilteredRecipesContext.Provider value={ contextValue }>
      { children }
    </FilteredRecipesContext.Provider>
  );
}

FilteredRecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilteredRecipesContextProvider;
