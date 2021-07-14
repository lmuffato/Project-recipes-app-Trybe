import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';

export default function DoneRecipes() {
  document.title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(allRecipes);
  }, []);
  function filterDoneRecipes(filterName, arr) {
    const filterRecipeType = arr
      .filter((recipe) => recipe.type === filterName);
    console.log(filterRecipeType);
    switch (filterName) {
    case '':
      return arr;
    default:
      return filterRecipeType;
    }
  }
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      { doneRecipes && filterDoneRecipes(filter, doneRecipes).map((recipe, index) => (
        <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}
