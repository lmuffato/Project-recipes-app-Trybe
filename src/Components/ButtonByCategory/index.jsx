import { Button } from 'react-bootstrap';
import React from 'react';

function ButtonByCategory() {
  return (
    <div>
      <Button data-testid="filter-by-all-btn" type="button">All</Button>
      <Button data-testid="filter-by-food-btn" type="button">Food</Button>
      <Button data-testid="filter-by-drink-btn" type="button">Drinks</Button>
    </div>
  );
}

export default ButtonByCategory;
