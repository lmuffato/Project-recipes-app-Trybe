import React, { useEffect } from 'react';
import { useStateEasyRedux } from 'easy-redux-trybe';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function FilterButtons({ path }) {
  const [, setStateRedux] = useStateEasyRedux(FilterButtons, {});

  const verifyUrl = String(path).includes('comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(verifyUrl);
      const results = await response.json();
      const verifyResults = String(path).includes('comidas')
        ? results.meals : results.drinks;
      const INDEX_END = 5;
      const fiveCategories = verifyResults.slice(0, INDEX_END);
      setStateRedux({ actionType: 'FETCH_CATEGORY', fiveCategories });
    };
    fetchCategory();
  }, []);

  const fiveCategories = useSelector((state) => (
    state.FilterButtons ? state.FilterButtons.fiveCategories : undefined));

  return (
    <div>
      <button type="button">All</button>
      {fiveCategories && fiveCategories.map(({ strCategory: categoryName }) => (
        <button
          data-testid={ `${categoryName}-category-filter` }
          key={ categoryName }
          type="button"
        >
          { categoryName }
        </button>
      ))}
    </div>
  );
}

FilterButtons.propTypes = {
  path: PropTypes.string.isRequired,
};

export default FilterButtons;
