import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RecipeFilters(props) {
  const { handleClick } = props;
  const setFilter = (e) => {
    handleClick(e.target.textContent);
    handleClick(e.target.name);
  };
  return (
    <div className="category-container">
      <button
        type="button"
        onClick={ setFilter }
        className="categoryBtn"
        variant="outline-dark"
        data-testid="filter-by-all-btn"
        name="All"
      >
        All
      </button>
      <button
        type="button"
        className="categoryBtn"
        onClick={ setFilter }
        variant="outline-dark"
        data-testid="filter-by-food-btn"
        name="comida"
      >
        Food
      </button>
      <button
        type="button"
        className="categoryBtn"
        onClick={ setFilter }
        variant="outline-dark"
        data-testid="filter-by-drink-btn"
        name="bebida"
      >
        Drink
      </button>
    </div>
  );
}
RecipeFilters.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
