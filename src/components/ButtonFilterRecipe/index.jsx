import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { func } from 'prop-types';
import { DropdownButton } from './styles';

export default function ButtonFiltersRecipe({ changeValueToFilterRecipes }) {
  return (
    <section>
      <DropdownButton
        id="dropdown-split-variants-Danger"
        title="Filtros"
        variant="danger"
      >
        <Dropdown.Item
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ changeValueToFilterRecipes }
        >
          All
        </Dropdown.Item>
        <Dropdown.Item
          type="button"
          name="comida"
          data-testid="filter-by-food-btn"
          onClick={ changeValueToFilterRecipes }
        >
          Foods
        </Dropdown.Item>
        <Dropdown.Item
          type="button"
          name="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ changeValueToFilterRecipes }
        >
          Drinks
        </Dropdown.Item>
      </DropdownButton>
    </section>
  );
}

ButtonFiltersRecipe.propTypes = {
  changeValueToFilterRecipes: func,
}.isRequired;
