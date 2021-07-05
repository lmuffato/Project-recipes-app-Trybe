import React, { useEffect, useState } from 'react';

function FoodsArea() {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    const getAreas = async () => {
      const fetchArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then((respo) => respo);
      const allAreas = fetchArea.meals.map((country) => (
        country.strArea
      ));
      setAreas(allAreas);
    };
    getAreas();
  }, []);

  return (
    <div>
      <select data-testid="explore-by-area-dropdown">
        <option>All</option>
        {areas.map((area, index) => (
          <option key={ index } data-testid={ `${area}-option` }>{area}</option>
        ))}
      </select>
    </div>
  );
}

export default FoodsArea;
