import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../contexts/ReceitasContext';

function Filter({ page }) {
  const [APIresponse, setAPIResponse] = useState();
  const { fetchApi, setFilter } = useContext(ReceitasContext);
  let classes = [];

  async function fetchClass(endpoint) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setAPIResponse(response);
      });
  }

  useEffect(() => {
    if (page === 'comidas') {
      fetchClass('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    } else {
      fetchClass('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (APIresponse !== undefined && page === 'comidas') {
    const firstFive = 5;
    const arr = [];
    for (let index = 0; index < firstFive; index += 1) {
      const element = APIresponse.meals[index];
      arr.push(element);
    }
    classes = arr;
  } else if (APIresponse !== undefined && page === 'bebidas') {
    const firstFive = 5;
    const arr = [];
    for (let index = 0; index < firstFive; index += 1) {
      const element = APIresponse.drinks[index];
      arr.push(element);
    }
    classes = arr;
  }

  function handleClick(clas) {
    if (page === 'comidas') {
      fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clas}`);
      setFilter(true);
    } else {
      fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${clas}`);
      setFilter(true);
    }
  }

  return (classes.length > 1
    && (
      <div>
        {classes.map((clas, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${clas.strCategory}-category-filter` }
            onClick={ () => handleClick(clas.strCategory) }
          >
            {clas.strCategory}
          </button>))}
      </div>
    ));
}

Filter.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Filter;
