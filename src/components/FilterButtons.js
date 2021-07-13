/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useStateEasyRedux } from 'easy-redux-trybe';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/FilterButtons.module.scss';
import { getLocalStorage } from '../helper';
// import { fetchCategories } from '../services';

function FilterButtons({ path }) {
  const [stateRedux, setStateRedux] = useStateEasyRedux(FilterButtons, {});

  const verifyUrl = String(path).includes('comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const mealOrDrink = String(path).includes('comidas')
    ? 'themealdb' : 'thecocktaildb';

  const fetchCategories = async (categorie, searchApi) => {
    try {
      console.log(categorie, searchApi);
      const tokenApi = searchApi.includes('meal') ? 'meals' : 'cocktails';
      console.log(tokenApi);
      const token = getLocalStorage(`${tokenApi}Token`);
      console.log(token)
      const data = await fetch(
        `www.${searchApi}.com/api/json/v1/1/filter.php?c=${categorie}&token=${token}`,
      );
      const json = await data.json();
      console.log(json)
      return json;
    } catch (error) {
      console.log(error);
      return Promise.resolve('Erro, não foi possível completar a requisicão');
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(verifyUrl);
      const results = await response.json();
      const verifyResults = String(path).includes('comidas')
        ? results.meals : results.drinks;
      const INDEX_END = 5;
      const fiveCategories = verifyResults.slice(0, INDEX_END);
      console.log(fiveCategories);
      setStateRedux({ actionType: 'FETCH_CATEGORY', fiveCategories });
    };
    fetchCategory();
  }, []);

  return (
    <div className={ styles.container }>
      <div className={ styles.areaButtons }>
        <button type="button">All</button>
        {stateRedux.fiveCategories && stateRedux
          .fiveCategories.map(({ strCategory: categoryName }) => (
            <button
              data-testid={ `${categoryName}-category-filter` }
              key={ categoryName }
              type="button"
              onClick={ (ev) => fetchCategories(ev.target.value, mealOrDrink) }
            >
              { categoryName }
            </button>
          ))}
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  path: PropTypes.string.isRequired,
};

export default FilterButtons;
