import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import { fetchMealsCategories, fetchDrinksCategories } from '../services/getApis';

function FilterProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMealsCategories = async () => {
    const apiResult = await fetchMealsCategories();
    setMealsCategories(apiResult.meals);
  };

  const getDrinksCategories = async () => {
    const apiResult = await fetchDrinksCategories();
    setDrinksCategories(apiResult.drinks);
  };

  useEffect(() => {
    setIsLoading(true);
    getMealsCategories();
    getDrinksCategories();
    setIsLoading(false);
  }, []);

  return (
    <FilterContext.Provider
      value={ {
        mealsCategories,
        drinksCategories,
        isLoading,
      } }
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
