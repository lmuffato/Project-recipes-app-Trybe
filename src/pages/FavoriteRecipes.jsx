import React from 'react';
import ButtonFiltersRecipe from '../components/ButtonFiltersRecipe';
import Header from '../components/Header';
import useRecipeFilter from '../hooks/useRecipeFilter';

export default function FavoriteRecipes() {
  const {
    changeValueToFilterRecipes,
    filteredRecipes,
  } = useRecipeFilter('favoriteRecipes');

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <ButtonFiltersRecipe
        changeValueToFilterRecipes={ changeValueToFilterRecipes }
      />
      <main>
        {filteredRecipes.map((recipe, index) => (
          <RecipeFavoriteCard
            key={ recipe.id }
            recipeDone={ recipe }
            index={ index }
          />
        ))}
      </main>
    </section>
  );
}
