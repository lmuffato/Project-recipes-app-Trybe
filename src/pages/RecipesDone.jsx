import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';
import usePersistedState from '../hooks/usePersistedState';

export default function RecipesDone() {
  const [doneRecipes] = usePersistedState('doneRecipes', []);
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const changeValueToFilterRecipes = ({ target }) => {
    const { name } = target;
    setFilter(name);
  };

  useEffect(() => {
    const changeFilteredRecipes = () => {
      const fixedFilter = filter === 'all' ? '' : filter;
      const newFilteredRecipes = doneRecipes
        .filter(({ type }) => type.includes(fixedFilter));

      setFilteredRecipes(newFilteredRecipes);
    };

    changeFilteredRecipes();
  }, [filter]);

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
