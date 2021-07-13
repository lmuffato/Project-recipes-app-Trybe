import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

function ButtonByCategory({ filterAll, filterFoods, filterDrinks }) {
  return (
    <div className="btn-container">
      <Button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ filterAll }
        className="list-btn"
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterFoods }
        className="list-btn"
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterDrinks }
        className="list-btn"
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
