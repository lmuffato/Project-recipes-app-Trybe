import React, { useState, useEffect } from 'react';
// import useFetchRecipes from '../../effects/useFetchRecipes';

function AreasList() {
  const fetchAreasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  // const [, setFetchUrl] = useFetchRecipes('meals');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(fetchAreasUrl);
      const data = await res.json();
      const treatedData = data.meals.map((category) => category.strArea);
      setAreas(treatedData);
      console.log(treatedData);
    };

    fetchCategories();
  }, [fetchAreasUrl]);

  // const handleCategoryClick = (category) => {
  //   if (lastCategoryClicked !== category && category !== 'All') {
  //     const fetchRecipesByCategoryUrl = type === 'meals'
  //       ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
  //       : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  //     setLastCategoryClicked(category);
  //     return setFetchUrl(`${fetchRecipesByCategoryUrl}${category}`);
  //   }

  //   if (category === 'All') {
  //     setLastCategoryClicked('All');
  //   } else {
  //     setLastCategoryClicked('');
  //   }

  //   if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //   return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  // };

  if (areas.length === 0) return 'Loading locations';

  return (
    <div>
      <select data-testid="explore-by-area-dropdown">
        { areas.map((area, index) => (
          <option
            key={ index }
            value={ area }
            data-testid={ `${area}-option` }
          >
            { area }
          </option>
        )) }
      </select>
    </div>
  );
}

export default AreasList;
