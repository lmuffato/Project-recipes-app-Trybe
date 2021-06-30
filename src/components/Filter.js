import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Buttons';

function Filter({ page }) {
  const [APIresponse, setAPIResponse] = useState();
  let classes = [];

  async function fetchApi(endpoint) {
    await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setAPIResponse(response);
      });
  }

  useEffect(() => {
    if (page === 'comidas') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    } else {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
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

  return (classes.length > 1
    && (
      <div>
        {classes.map((clas, index) => <Button name={ clas.strCategory } key={ index } />)}
      </div>
    ));
}

Filter.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Filter;
