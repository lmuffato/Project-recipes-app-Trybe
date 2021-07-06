import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function ProviderRecipes({ children }) {
  const [filteredRecipe, setRecipes] = useState([]);
  const [activeFilters, setFilter] = useState([]);
  const [recipeDetail, setDetail] = useState({});

  const fetchRecipes = () => {
    // esta função vai fazer a solicitação das receitas e
    // aplicar os filtros devidos;
    console.log(activeFilters);
    setRecipes({});
  };
  const fetchDetail = (recipeId) => {
    // Esta função deveria fazer a requisitção de detalhes de
    // uma receita quando esta for clicada
    console.log(recipeId);
    setDetail({});
  };

  return (
    <ContextRecipes.Provider
      value={ {
        filteredRecipe,
        fetchRecipes,
        recipeDetail,
        fetchDetail,
        setFilter,
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
