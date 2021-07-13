import React from 'react';
import ButtonFiltersRecipe from '../../components/ButtonFilterRecipe';
import Header from '../../components/Header';
import RecipeDoneCard from '../../components/RecipeDoneCard';
import useRecipeFilter from '../../hooks/useRecipeFilter';
import {
  ContainerRescipesDone,
  MainRecipesDoneCard,
  FilterContainer,
} from './styles';

export default function RecipesDone() {
  const {
    changeValueToFilterRecipes,
    filteredRecipes,
    filtros,
  } = useRecipeFilter('doneRecipes');

  return (
    <ContainerRescipesDone>
      <Header title="Receitas Feitas" />
      <FilterContainer>
        <ButtonFiltersRecipe
          changeValueToFilterRecipes={ changeValueToFilterRecipes }
        />

        <span>{filtros}</span>
      </FilterContainer>
      <MainRecipesDoneCard>
        {filteredRecipes
          && filteredRecipes.map((recipe, index) => (
            <RecipeDoneCard key={ recipe.id } recipeDone={ recipe } index={ index } />
          ))}
      </MainRecipesDoneCard>
    </ContainerRescipesDone>
  );
}
