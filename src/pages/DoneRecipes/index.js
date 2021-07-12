import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';

export default function DoneRecipes() {
  document.title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(allRecipes);
    setFilter(allRecipes);
  }, []);
  function filterDoneRecipesType(filterName) {
    const filterRecipeType = doneRecipes.filter((recipe) => recipe.type === filterName);
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterName === '') {
      setFilter(allRecipes);
    } else {
      setFilter(filterRecipeType);
    }
  }
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterDoneRecipesType('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterDoneRecipesType('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDoneRecipesType('bebida') }
      >
        Drinks
      </button>
      { filter && filter.map((recipe, index) => (
        <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}
