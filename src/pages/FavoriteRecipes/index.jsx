import React, { useEffect, useState } from 'react';
import ButtonFiltersRecipe from '../../components/ButtonFilterRecipe';
import Header from '../../components/Header';
import RecipeFavoriteCard from '../../components/RecipeFavoriteCard';
import useRecipeFilter from '../../hooks/useRecipeFilter';
import {
  ContainerFavoriteRecipes,
  FilterContainer,
  MainRecipesDoneCard,
} from './styles';

export default function FavoriteRecipes() {
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const { changeValueToFilterRecipes, filteredRecipes, filtros } = useRecipeFilter(
    'favoriteRecipes',
    hasBeenChanged,
  );

  useEffect(() => {
    if (hasBeenChanged) {
      setHasBeenChanged(false);
    }
  }, [hasBeenChanged]);

  return (
    <ContainerFavoriteRecipes>
      <Header title="Receitas Favoritas" />
      <FilterContainer>
        <ButtonFiltersRecipe
          changeValueToFilterRecipes={ changeValueToFilterRecipes }
        />

        <span>{filtros}</span>
      </FilterContainer>
      <MainRecipesDoneCard>
        {filteredRecipes
          && filteredRecipes.map((recipe, index) => (
            <RecipeFavoriteCard
              key={ recipe.id }
              recipeFavorite={ recipe }
              index={ index }
              setHasBeenChanged={ setHasBeenChanged }
            />
          ))}
      </MainRecipesDoneCard>
    </ContainerFavoriteRecipes>
  );
}
