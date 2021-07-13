/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/FilterButtons.module.scss';
// import { getLocalStorage } from '../helper';
// import { fetchCategories } from '../services';

function FilterButtons({ path }) {
  const [stateRedux, setStateRedux] = useStateEasyRedux(FilterButtons, {});
  const [, setTwelveItens] = useStateEasyRedux({ name: 'Search' }, {});

  const verifyUrl = String(path).includes('comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const mealOrDrink = String(path).includes('comidas')
    ? 'themealdb' : 'thecocktaildb';

  const Search = useSelector((state) => state.Search);

  const fetchByCategory = async (categorie, searchApi) => {
    setTwelveItens({ isLoading: true });
    let category = categorie;
    if (Search.toggle && Search.nameCategory === categorie) {
      category = 'All';
      setTwelveItens({ toggle: false });
    }

    const endUrl = (category === 'All'
      ? 'search.php?s=' : `filter.php?c=${category}`);

    try {
      // const tokenApi = searchApi.includes('meal') ? 'meals' : 'cocktails';
      const jsonTarget = searchApi.includes('meal') ? 'meals' : 'drinks';
      // const token = getLocalStorage(`${tokenApi}Token`);
      const data = await fetch(
        `https://www.${searchApi}.com/api/json/v1/1/${endUrl}`,
      );
      const json = await data.json();
      const TWELVE = 12;
      const resultsTwelveItems = json[jsonTarget].slice(0, TWELVE);
      console.log(resultsTwelveItems);
      setTwelveItens({
        resultsTwelveItems,
        toggle: true,
        nameCategory: categorie,
        isLoading: false });
      return resultsTwelveItems;
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className={ styles.container }>
      <div className={ styles.areaButtons }>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ (ev) => fetchByCategory(ev.target.textContent, mealOrDrink) }
        >
          All
        </button>
        {stateRedux.fiveCategories && stateRedux
          .fiveCategories.map(({ strCategory: categoryName }) => (
            <button
              data-testid={ `${categoryName}-category-filter` }
              key={ categoryName }
              type="button"
              onClick={ (ev) => fetchByCategory(ev.target.textContent, mealOrDrink) }
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
