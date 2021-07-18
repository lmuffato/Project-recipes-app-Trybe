import React, { useContext } from 'react';
import Context from '../context/Context';

function CompletedButtomFilters() {
  const { setCompletedFill } = useContext(Context);

  const handleFilter = (value) => {
    setCompletedFill(value);
  };

  const renderButtoms = () => (
    <ul className="buttons-list">
      <li key="All">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="buttons"
          onClick={ () => handleFilter('All') }
        >
          All
        </button>
      </li>
      <li key="Food">
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="buttons"
          onClick={ () => handleFilter('comida') }
        >
          Food
        </button>
      </li>
      <li key="Drinks">
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="buttons"
          onClick={ () => handleFilter('bebida') }
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
