import React from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import useRecipeFilter from '../hooks/useRecipeFilter';

export default function RecipesDone() {
  const { changeValueToFilterRecipes, filteredRecipes } = useRecipeFilter();
  console.log(filteredRecipes);

  return (
    <section>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ changeValueToFilterRecipes }
      >
        All
      </button>
      <button
        type="button"
        name="comida"
        data-testid="filter-by-food-btn"
        onClick={ changeValueToFilterRecipes }
      >
        Foods
      </button>
      <button
        type="button"
        name="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ changeValueToFilterRecipes }
      >
        Drinks
      </button>
      <main>
        {filteredRecipes.map((recipe, index) => (
          <RecipeDoneCard key={ recipe.id } recipeDone={ recipe } index={ index } />
        ))}
      </main>
    </section>
  );
}
