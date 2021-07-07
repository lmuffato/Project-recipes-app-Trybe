import React from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import usePersistedState from '../hooks/usePersistedState';

export default function RecipesDone() {
  const [doneRecipes] = usePersistedState('doneRecipes', []);
  console.log(doneRecipes);

  return (
    <section>
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Foods
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      <main>
        {doneRecipes.map((recipe, index) => (
          <RecipeDoneCard
            key={ recipe.id }
            recipeDone={ recipe }
            index={ index }
          />
        ))}
      </main>
    </section>
  );
}
