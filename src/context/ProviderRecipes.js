import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function ProviderRecipes({ children }) {
  const [filteredRecipe, setRecipes] = useState([]);
  const [activeFilters, setFilter] = useState([]);
  const [recipeDetail, setDetail] = useState({});
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);
  const [dataDrinkCards, setDataDrinkCards] = useState('');
  const [loadingCards, setLoadingCards] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const getCategories = async (type) => {
    const siteName = type === 'Meal' ? 'meal' : 'cocktail';
    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/list.php?c=list`;
    const dbCategories = await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => response[`${type.toLowerCase()}s`]);
    const newCategories = ['All'];
    dbCategories.forEach((category) => newCategories.push(category.strCategory));
    setCategories(newCategories);
  };

  const getRecipes = async (category = 'All', type = 'Meal') => {
    const siteName = type === 'Meal' ? 'meal' : 'cocktail';
    let recipeList = [];
    if (category !== 'All') {
      const categoryEndpoint = `https://www.the${siteName}db.com/api/json/v1/1/filter.php?c=${category}`;
      recipeList = await fetch(categoryEndpoint)
        .then((response) => response.json())
        .then((response) => response[`${type.toLowerCase()}s`]);
    } else {
      const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/search.php?s=`;
      recipeList = await fetch(endpoint)
        .then((response) => response.json())
        .then((response) => response[`${type.toLowerCase()}s`]);
      recipeList = recipeList.map((item) => ({
        [`id${type}`]: item[`id${type}`],
        [`str${type}`]: item[`str${type}`],
        [`str${type}Thumb`]: item[`str${type}Thumb`],
      }));
    }
    setRecipes(recipeList);
  };
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
        getRecipes,
        categories,
        getCategories,
        recipeDetail,
        fetchDetail,
        setFilter,
        search,
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
