import React from 'react';
import ButtonFiltersRecipe from '../components/ButtonFiltersRecipe';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import useRecipeFilter from '../hooks/useRecipeFilter';

export default function RecipesDone() {
  const { changeValueToFilterRecipes, filteredRecipes } = useRecipeFilter('doneRecipes');

  return (
    <section>
      <Header title="Receitas Feitas" />
      <ButtonFiltersRecipe changeValueToFilterRecipes={ changeValueToFilterRecipes } />
      <main>
        { filteredRecipes && filteredRecipes.map((recipe, index) => (
          <RecipeDoneCard key={ recipe.id } recipeDone={ recipe } index={ index } />
        ))}
      </main>
    </section>
  );
}
