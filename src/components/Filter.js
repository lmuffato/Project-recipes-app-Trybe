import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../contexts/ReceitasContext';

function Filter({ page }) {
  const [APIresponse, setAPIResponse] = useState();
  const [selected, setSelected] = useState();
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

  function handleChange(event) {
    if (page === 'comidas') {
      fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${event.target.value}`);
      setFilter(true);
      setSelected(event.target.value);
    } else {
      fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${event.target.value}`);
      setFilter(true);
      setSelected(event.target.value);
    }
  }

  function handleClick(event) {
    if (selected === event.target.value) {
      event.target.checked = false;
      if (page === 'comidas') {
        fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
    }
  }
  return (classes.length > 1
    && (
      <div>
        {classes.map((clas, index) => (
          <label key={ index } htmlFor={ clas.strCategory }>
            <input
              type="radio"
              data-testid={ `${clas.strCategory}-category-filter` }
              onChange={ handleChange }
              id={ clas.strCategory }
              name="class"
              value={ clas.strCategory }
              onClick={ handleClick }
            />
            {clas.strCategory}
          </label>
        ))}
      </div>
    ));
}

Filter.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Filter;
