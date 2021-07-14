import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useMainRecipe from '../../hooks/useMainRecipe';
import {
  MainContainerDetails,
  DropdownButton,
  FilterContainer,
} from '../../styles/shared/MainDetails/MainDetailsStyles';
import ContainerRecipeCards from '../../styles/shared/ContainerRecipeCards';

export default function Drinks() {
  const {
    renderCards,
    handleClickCategory,
    renderLoading,
    recipe,
    filter,
  } = useMainRecipe('drink');
  const { drinks } = recipe.list;

  return (
    <MainContainerDetails>
      <Header title="Bebidas" searchIcon />

      <FilterContainer>
        <DropdownButton
          id="dropdown-split-variants-Danger"
          title="Filtros"
          variant="danger"
        >
          <Dropdown.Item
            data-testid="All-category-filter"
            type="button"
            onClick={ handleClickCategory }
          >
            All
          </Dropdown.Item>
          {drinks.map((category) => (
            <Dropdown.Item
              key={ category }
              data-testid={ `${category}-category-filter` }
              type="button"
              onClick={ handleClickCategory }
            >
              {category.replace(category[0], category[0].toUpperCase())}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <span>{filter}</span>
      </FilterContainer>

      {renderLoading(
        <ContainerRecipeCards>{renderCards()}</ContainerRecipeCards>,
      )}

      <Footer drink />
    </MainContainerDetails>
  );
}
