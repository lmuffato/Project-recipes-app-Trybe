import React, { useEffect, useState } from 'react';
import ButtonFiltersRecipe from '../components/ButtonFiltersRecipe';
import Header from '../components/Header';
import RecipeFavoriteCard from '../components/RecipeFavoriteCard';
import useRecipeFilter from '../hooks/useRecipeFilter';

export default function FavoriteRecipes() {
  // const favoriteRecipesFromStorage = JSON.parse(
  //   localStorage.getItem('favoriteRecipes'),
  // ) || [];
  // const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesFromStorage);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const { changeValueToFilterRecipes, filteredRecipes } = useRecipeFilter(
    'favoriteRecipes',
    hasBeenChanged,
  );

  useEffect(() => {
    if (hasBeenChanged) {
      setHasBeenChanged(false);
    }
  }, [hasBeenChanged]);

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <ButtonFiltersRecipe
        changeValueToFilterRecipes={ changeValueToFilterRecipes }
      />
      <main>
        {filteredRecipes && filteredRecipes.map((recipe, index) => (
          <RecipeFavoriteCard
            key={ recipe.id }
            recipeFavorite={ recipe }
            index={ index }
            setHasBeenChanged={ setHasBeenChanged }
          />
        ))}
      </main>
    </section>
  );
}
