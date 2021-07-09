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
    console.log(activeFilters, recipeList);
    setRecipes(recipeList);
  };

  // esta função retorna o endpoint da API baseado no filtro escolhido
  const chooseEndpoint = () => {
    let endpoint = '';
    if (radioFilter === 'nome') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    }
    if (radioFilter === 'ingrediente') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    }
    if (radioFilter === 'primeira-letra') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    }
    return endpoint;
  };

  // esta função vai fazer a solicitação das receitas e
  // aplicar os filtros devidos
  const fetchRecipes = async () => {
    const endpoint = chooseEndpoint();
    const response = await fetch(endpoint);
    const data = await response.json();
    setRecipes(data);
    console.log(data);
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
