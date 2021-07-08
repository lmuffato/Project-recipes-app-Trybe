import React, { useContext } from 'react';
import Header from '../components/Header';

import DoneRecipesContext from '../contexts/DoneRecipesContext';

import DoneRecipeCard from '../components/ReceitasFeitas/DoneRecipeCard';

export default function ReceitasFeitas() {
  const { doneRecipes } = useContext(DoneRecipesContext);

  return (
    <div>
      <Header
        title="Receitas Feitas"
        enableSearchIcon={ false }
      />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
        {doneRecipes.map((done, index) => (
          <DoneRecipeCard key={ index } recipe={ done } index={ index } />
        ))}
      </div>
    </div>
  );
}
