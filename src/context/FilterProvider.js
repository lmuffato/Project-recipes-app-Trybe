import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';
import { fetchMealsCategories, fetchDrinksCategories,
  fetchMealsByCategory, fetchDrinksByCategory } from '../services/getApis';

function FilterProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState([]);
  const [drinksByCategory, setDrinksByCategory] = useState([]);
  const [filterButton, setFilterButton] = useState('');
  const [drinkFilterButton, setDrinkFilterButton] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getMealsCategories = async () => {
    const apiResult = await fetchMealsCategories();
    setMealsCategories(apiResult.meals);
  };

  const getDrinksCategories = async () => {
    const apiResult = await fetchDrinksCategories();
    setDrinksCategories(apiResult.drinks);
  };

  const getMealByCategory = async (category) => {
    const apiResult = await fetchMealsByCategory(category);
    setMealsByCategory(apiResult.meals);
  };

  const getDrinkByCategory = async (category) => {
    if (category) {
      const apiResult = await fetchDrinksByCategory(category);
      setDrinksByCategory(apiResult.drinks);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getMealByCategory(filterButton);
    getDrinkByCategory(drinkFilterButton);
    setIsLoading(false);
  }, [filterButton, drinkFilterButton]);

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
        filterButton,
        setFilterButton,
        mealsByCategory,
        drinkFilterButton,
        drinksByCategory,
        setDrinkFilterButton,
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
