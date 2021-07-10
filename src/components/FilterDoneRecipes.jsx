import React from 'react';
import { Button } from 'react-bootstrap';

export default function FilterDoneRecipes() {
  return (
    <>
      <Button data-testid="filter-by-all-btn">All</Button>
      <Button data-testid="filter-by-food-btn">Food</Button>
      <Button data-testid="filter-by-drink-btn">Drinks</Button>
    </>
  );
}
