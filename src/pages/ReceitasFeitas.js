import React, { useContext, useState } from 'react';
import Header from '../components/Header';

import DoneRecipesContext from '../contexts/DoneRecipesContext';

import DoneRecipeCard from '../components/ReceitasFeitas/DoneRecipeCard';
import '../style/ReceitasFeitas.css';

export default function ReceitasFeitas() {
  const { doneRecipes } = useContext(DoneRecipesContext);
  const [filter, setFilter] = useState('');

  const filteredDoneRecipes = filter
    ? doneRecipes.filter((recipe) => recipe.type === filter) : doneRecipes;

  return (
    <div className="done-recipes-main">
      <Header
        title="Completed Recipes"
        enableSearchIcon={ false }
      />
      <div className="buttons-done" style={ { backgroundColor: 'transparent' } }>
        <button
          className="button is-warning"
          type="button"
          data-testid="filter-by-all-btn"
          value=""
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          All
        </button>
        <br />
        <br />
        <button
          className="button is-primary"
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Food
        </button>
        <br />
        <br />
        <button
          className="button is-primary"
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ (ev) => setFilter(ev.target.value) }
        >
          Drink
        </button>
      </div>
      <br />
      <div className="done-cards-container">
        {filteredDoneRecipes.map((done, index) => (
          <>
            <DoneRecipeCard key={ index } recipe={ done } index={ index } />
            <br />
          </>
        ))}
      </div>
    </div>
  );
}
