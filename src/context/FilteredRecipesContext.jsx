import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const FilteredRecipesContext = createContext({});

const MAX_RECIPES = 12;
// const INITIAL_STATE = {
//   radioValue: '',
//   inputSearch: '',
// };

function FilteredRecipesContextProvider({ children }) {
  // const [filteredRecipesData, setFilteredRecipesData] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchBarFilters, setSearchBarFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFilteredMealRecipes = async (endpoint, type) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      // console.log(Object.entries(data));
      const formattingData = {
        ...data,
        [type]: data[type].slice(0, MAX_RECIPES),
      };
      if (formattingData[type] !== null) {
        setFilteredRecipes(formattingData[type]);
      }
      console.log(formattingData[type] !== null ? 'sim' : 'no');
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const alertMessage = () => {
    window.alert('Sua busca deve conter somente 1 (um) caracter');
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
        alertMessage();
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
        alertMessage();
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
    getFilteredRecipes,
    isLoading,
    setIsLoading };

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
