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
