import React from 'react';
import { func } from 'prop-types';

export default function ButtonFiltersRecipe({ changeValueToFilterRecipes }) {
  return (
    <section>
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
    </section>
  );
}

ButtonFiltersRecipe.propTypes = {
  changeValueToFilterRecipes: func,
}.isRequired;
