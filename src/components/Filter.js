import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/FilterInputGroup.css';

function Filter({ page }) {
  const [APIresponse, setAPIResponse] = useState();
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
    const arr = [{ strCategory: 'All' }];
    for (let index = 0; index < firstFive; index += 1) {
      const element = APIresponse.meals[index];
      arr.push(element);
    }
    classes = arr;
  } else if (APIresponse !== undefined && page === 'bebidas') {
    const firstFive = 5;
    const arr = [{ strCategory: 'All' }];
    for (let index = 0; index < firstFive; index += 1) {
      const element = APIresponse.drinks[index];
      arr.push(element);
    }
    classes = arr;
  }

  return (classes.length > 1
    && (
      <div className="input-group-filter">
        {classes.map((clas, index) => (
          <Button key={ index } clas={ clas } index={ index } page={ page } />
        ))}
      </div>
    ));
}

Filter.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Filter;
