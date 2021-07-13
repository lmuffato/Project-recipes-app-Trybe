import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function ProviderRecipes({ children }) {
  const [filteredRecipe, setRecipes] = useState([]);
  const [activeFilters, setFilter] = useState([]);
  const [recipeDetail, setDetail] = useState({});
  const [search, setSearch] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);
  // const [type, setType] = useState('');
  const [dataDrinkCards, setDataDrinkCards] = useState('');
  const [loadingCards, setLoadingCards] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  /* useEffect(() => {
    (async function fetchDrinkAPI() {
      const max = 12;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const presentation = data.drinks.slice(0, max);
      setDataDrinkCards(presentation);
    }());
  }, []); */

  // Esta função retorna o endpoint da API baseado no filtro escolhido
  const chooseEndpoint = (link) => {
    let endpoint = '';
    if (radioFilter === 'nome') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/search.php?s=${search}`;
    }
    if (radioFilter === 'ingrediente') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/filter.php?i=${search}`;
    }
    if (radioFilter === 'primeira-letra') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/search.php?f=${search}`;
    }
    return endpoint;
  };

  // esta função vai fazer a solicitação das receitas e
  // aplicar os filtros devidos
  const fetchRecipes = async (link) => {
    const type = link === 'mealdb' ? 'Meal' : 'Drink';
    const endpoint = chooseEndpoint(link);
    setLoadingCards(true);
    const response = await fetch(endpoint)
      .then((r) => r.json())
      .then((r) => r[`${type.toLowerCase()}s`]);
    setLoadingCards(false);

    setRecipes(response);
  };

  const fetchDetail = (recipeId) => {
    // Esta função deveria fazer a requisição de detalhes de
    // uma receita quando esta for clicada
    console.log(recipeId);
    setDetail({});
  };

  return (
    <ContextRecipes.Provider
      value={ {
        activeFilters,
        filteredRecipe,
        recipeDetail,
        fetchDetail,
        setSearch,
        radioFilter,
        setRadioFilter,
        searchBtn,
        setSearchBtn,
        fetchRecipes,
        dataDrinkCards,
        setDataDrinkCards,
        loadingCards,
        setLoadingCards,
        showSearchBar,
        setShowSearchBar,
      } }
    >
      { children }
    </ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;

export default ProviderRecipes;
