import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

function ButtonByCategory({ filterAll, filterFoods, filterDrinks }) {
  return (
    <div>
      <Button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ filterAll }
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterFoods }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterDrinks }
      >
        Drinks
      </Button>
    </div>
  );
}

ButtonByCategory.propTypes = {
  filterAll: PropTypes.func,
  filterFoods: PropTypes.func,
  filterDrinks: PropTypes.func,
}.isRequired;
export default ButtonByCategory;
