import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function SelectArea() {
  const { mealAreas, setGlobalArea } = useContext(FilterContext);
  return (
    <select
      data-testid="explore-by-area-dropdown"
      onChange={ ({ target }) => setGlobalArea(target.value) }
    >
      <option value="All" data-testid="All-option">All</option>
      {mealAreas.map((area) => (
        <option
          key={ area.strArea }
          value={ area.strArea }
          data-testid={ `${area.strArea}-option` }
        >
          { area.strArea }
        </option>
      ))}
    </select>
  );
}

export default SelectArea;
