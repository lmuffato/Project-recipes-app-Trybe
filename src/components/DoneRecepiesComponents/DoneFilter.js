import React, { useContext } from 'react';
import ReceitasContext from '../../contexts/ReceitasContext';

export default function DoneFilter() {
  const { setFilterValue } = useContext(ReceitasContext);

  function handleClick({ target }) {
    setFilterValue(target.value);
  }

  return (
    <div className="doneFilter">
      <div>
        <input
          type="button"
          value="All"
          id="All"
          data-testid="filter-by-all-btn"
          name="filter"
          onClick={ (e) => handleClick(e) }
        />
      </div>
      <div>
        <input
          type="button"
          value="Food"
          id="Food"
          data-testid="filter-by-food-btn"
          name="filter"
          onClick={ (e) => handleClick(e) }
        />
      </div>
      <div>
        <input
          type="button"
          value="Drinks"
          id="Drinks"
          data-testid="filter-by-drink-btn"
          name="filter"
          onClick={ (e) => handleClick(e) }
        />
      </div>
    </div>
  );
}
