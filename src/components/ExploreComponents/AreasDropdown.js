import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../../contexts/ReceitasContext';
import '../../styles/Explore.css';

function AreasDropdown() {
  const { fetchApi, foodAreas } = useContext(ReceitasContext);
  const [areas, setAreas] = useState('all');

  useEffect(() => {
    fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?a=list', 'areas-comidas');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (areas !== 'all') {
      fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas}`, 'comidas');
    } else {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'comidas');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areas]);

  return (
    <select
      className="area-select"
      name="area-dropdown"
      id="area-dropdown"
      data-testid="explore-by-area-dropdown"
      value={ areas }
      onChange={ (ev) => setAreas(ev.target.value) }
    >
      <option
        className="area-select-option"
        value="all"
        data-testid="All-option"
      >
        All

      </option>
      {foodAreas !== undefined && (
        foodAreas.meals.map((area) => (
          <option
            className="area-select-option"
            key={ area.strArea }
            value={ area.strArea }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}

          </option>
        ))
      )}
    </select>
  );
}

export default AreasDropdown;
