import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const FilteredRecipesContext = createContext({});

const MAX_RECIPES = 12;

function FilteredRecipesContextProvider(props) {
  const { children } = props;
  const [filteredRecipes, setFilteredRecipes] = useState([]); // estado que armazena as buscas feitas na searchBar
  const [filteredData, setFilteredData] = useState({});
  const [searchBarFilters, setSearchBarFilters] = useState([]); // estado que armazena os filtros (input de busca e input radio) da searchBar
  const [isLoading, setIsLoading] = useState(true); // será utilizado depois pra renderizar um componente de loading

  // faz o fetch na api, conforme endpoint e tipo para as telas de comidas e bebidas
  const fetchFilteredMealRecipes = async (endpoint, type) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      const formattingData = {
        ...data,
        [type]: data[type].slice(0, MAX_RECIPES),
      };
      // if (formattingData[type] !== null) {
      //   setFilteredRecipes(formattingData[type]);
      // }
      setFilteredData(formattingData);
      setFilteredRecipes(formattingData[type]);

      // console.log(formattingData[type] !== null ? 'sim' : 'no');
      // console.log(formattingData[type]);
      // console.log(formattingData);
    } catch (err) {
      console.log(err);
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  // cria alert p/ as buscas por primeira letra
  const alertMessage = () => {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  };

  // faz o switch case dos endpoints pra buscar receitas na api de comidas
  const handleMealFilterType = (filterType, query, type) => {
    const trimSpacesQuery = query.replace(/\s/g, '').trim();

    const endpointMealIngr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${trimSpacesQuery}`;
    const endpointMealName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${trimSpacesQuery}`;
    const endpointMealFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${trimSpacesQuery}`;

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

  // faz o switch case dos endpoints pra buscar receitas na api de drinks
  const handleDrinksFilterType = (filterType, query, type) => {
    const trimSpacesQuery = query.replace(/\s/g, '').trim();
    const encodeQuery = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
    // const cocktailEndpointIngr = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${trimSpacesQuery}`;
    const cocktailEndpointName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${trimSpacesQuery}`;
    const cocktailEndpointFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${trimSpacesQuery}`;

    switch (filterType) {
    case 'ingredient':
      return fetchFilteredMealRecipes(encodeQuery, type);
      // fetchFilteredMealRecipes(cocktailEndpointIngr, type);
      // break;
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

  // vai ser chamada no useEffect do componente CardList --> array de filtros como dependência
  const getFilteredRecipes = (type) => {
    if (searchBarFilters.length > 0) {
      console.log(searchBarFilters);
      searchBarFilters.forEach((item) => {
        console.log(item);
        const { inputSearch, radioValue } = item;
        if (type === 'meals') {
          handleMealFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
        }
        if (type === 'drinks') {
          handleDrinksFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
        }
      });
      setSearchBarFilters([]);
    }
  };

  const contextValue = {
    filteredRecipes,
    filteredData,
    setFilteredRecipes,
    searchBarFilters,
    setSearchBarFilters,
    getFilteredRecipes,
    fetchFilteredMealRecipes,
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

// Referências:
// Remoção de todos os espaços de uma string utilizando JavaScript:
// --> https://pt.stackoverflow.com/questions/382479/removendo-todos-os-espa%C3%A7os-de-uma-string-usando-javascript
// Remoção dos espaços ao final e no início de uma string:
// --> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// Codificar os espaços da URL:
// --> https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323
