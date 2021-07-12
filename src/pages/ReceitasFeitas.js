import React, { useContext, useState } from 'react';
import Header from '../components/Header';

import DoneRecipesContext from '../contexts/DoneRecipesContext';

import DoneRecipeCard from '../components/ReceitasFeitas/DoneRecipeCard';

export default function ReceitasFeitas() {
  const { doneRecipes } = useContext(DoneRecipesContext);
  const [filter, setFilter] = useState('');

  const filteredDoneRecipes = filter
    ? doneRecipes.filter((recipe) => recipe.type === filter) : doneRecipes;

  return (
    <div>
      <Header
        title="Receitas Feitas"
        enableSearchIcon={ false }
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value=""
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Drink
        </button>
        {filteredDoneRecipes.map((done, index) => (
          <DoneRecipeCard key={ index } recipe={ done } index={ index } />
        ))}
      </div>
    </div>
  );
}
