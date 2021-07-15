import React, { useState, useEffect } from 'react';
import useFetchRecipes from '../../effects/useFetchRecipes';
import AreasListContainer from './styles';

function AreasList() {
  const fetchAreasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const [, setFetchUrl] = useFetchRecipes('meals');
  const [selectAreaValue, setSelectAreaValue] = useState('Choose');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(fetchAreasUrl);
      const data = await res.json();
      const treatedData = data.meals.map((category) => category.strArea);
      setAreas(treatedData);
    };

    fetchCategories();
  }, [fetchAreasUrl]);

  function handleDropdownChange(event) {
    const { target: { value } } = event;
    setSelectAreaValue(value);

    if (value === 'All') {
      return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    setFetchUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
  }

  if (areas.length === 0) return 'Loading locations';

  return (
    <AreasListContainer>
      <select
        data-testid="explore-by-area-dropdown"
        value={ selectAreaValue }
        onChange={ handleDropdownChange }
      >
        {/* Implementação do placeholder 'Escolha um local' conforme dica do estudante Carlos Sá no Slack
        Link: https://trybecourse.slack.com/archives/C01L16B9XC7/p1625440257358800 */}
        <option disabled hidden value="Choose">Escolha um local</option>
        { areas.map((area, index) => (
          <option
            key={ index }
            value={ area }
            data-testid={ `${area}-option` }
          >
            { area }
          </option>
        )) }
        <option data-testid="All-option" value="All">All</option>
      </select>
    </AreasListContainer>
  );
}

export default AreasList;
