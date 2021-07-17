import React from 'react';

function CompletedButtomFilters() {
  const renderButtoms = () => (
    <ul className="buttons-list">
      <li key="All">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="buttons"
        >
          All
        </button>
      </li>
      <li key="Food">
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="buttons"
        >
          Food
        </button>
      </li>
      <li key="Drinks">
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="buttons"
        >
          Drinks
        </button>
      </li>
    </ul>
  );

  return (
    <div className="Buttom-filters">
      { renderButtoms() }
    </div>
  );
}

export default CompletedButtomFilters;
