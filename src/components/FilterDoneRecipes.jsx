import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FilterDoneRecipes({ setCurrFilter }) {
  return (
    <div>
      <Button
        onClick={ () => setCurrFilter('All') }
        data-testid="filter-by-all-btn"
      >
        All
      </Button>
      <Button
        onClick={ () => setCurrFilter('Food') }
        data-testid="filter-by-food-btn"
      >
        Food
      </Button>
      <Button
        onClick={ () => setCurrFilter('Drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </Button>
    </div>
  );
}

FilterDoneRecipes.propTypes = {
  setCurrFilter: PropTypes.func,
}.isRequired;
