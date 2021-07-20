import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeArea } from '../redux/actions/mealsAction';

function MealsAreasDropdown() {
  const dispatch = useDispatch();
  const mealAreas = useSelector((state) => state.meals.areas);

  const areas = [{ strArea: 'All' }, ...mealAreas];

  return (
    <select
      className="dropdown-area"
      data-testid="explore-by-area-dropdown"
      onChange={ ({ target: { value } }) => dispatch(changeArea(value)) }
      name="areas"
    >
      {areas.map(({ strArea }) => (
        <option
          data-testid={ `${strArea}-option` }
          value={ strArea }
          key={ strArea }
        >
          {strArea}
        </option>
      ))}
    </select>

  );
}

export default MealsAreasDropdown;
