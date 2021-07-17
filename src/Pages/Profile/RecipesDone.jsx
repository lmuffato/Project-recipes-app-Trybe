import React from 'react';
import { Button } from 'semantic-ui-react';
import { Header } from '../../components';

function RecipesDone() {
  return (
    <>
      <Header title="Receitas Feitas" searchBtn={ false } />
      <Button.Group fluid>
        <Button data-testid="filter-by-all-btn">All</Button>
        <Button data-testid="filter-by-food-btn">Food</Button>
        <Button data-testid="filter-by-drink-btn">Drinks</Button>
      </Button.Group>
    </>
  );
}

export default RecipesDone;
