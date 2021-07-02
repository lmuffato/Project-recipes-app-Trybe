import React from 'react';
import { Button } from 'react-bootstrap';

function ButtonFilter() {
  return (
    <div className="buttons-filter-done">
      <Button
        variant="secondary"
        size="sm"
        data-testid="filter-by-all-btn"
      >
        All
      </Button>
      <Button
        variant="secondary"
        size="sm"
        data-testid="filter-by-food-btn"
      >
        Food
      </Button>
      <Button
        variant="secondary"
        size="sm"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </Button>
    </div>);
}
export default ButtonFilter;
