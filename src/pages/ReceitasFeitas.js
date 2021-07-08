import React from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/doneRecipeCard';
import '../styles/doneRecipes.css';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="done-recipes-buttons">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <DoneRecipeCard />
    </div>
  );
}

export default ReceitasFeitas;
