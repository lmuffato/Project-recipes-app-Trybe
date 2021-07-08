import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import DoneCards from '../components/DoneCards';

function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="done-container">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drink</button>
        <div className="done-cards">
          <DoneCards />
        </div>
      </div>
      <BottomMenu />
    </div>
  );
}

export default DoneRecipes;
