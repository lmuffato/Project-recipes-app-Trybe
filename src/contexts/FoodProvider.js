import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import { fetchFoods, fetchFoodCategories } from '../services/mealAPI';

export default function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const [filteredFoods, setFilteredFoods] = useState([]);

  function filterFoodByCategory(ev, categoryName) {
    // console.log('categoryName', categoryName);
    console.log('foods', foods);
    // console.log('Entrei na func filterFoodByCategory');
    // console.log('filterFoodByCategory target', ev.target);

    ev.preventDefault();
    setIsCategoryClicked(true);

    setFilteredFoods(foods.filter((food) => food.strCategory === categoryName));

    console.log('filteredFoods', filteredFoods);
  }

  useEffect(() => {
    fetchFoods().then((data) => {
      setFoods(data.meals);
    });
    fetchFoodCategories().then((data) => {
      setCategories(data.meals);
    });
  }, []);

  return (
    <FoodContext.Provider
      value={ {
        foods,
        setFoods,
        categories,
        setCategories,
        filterFoodByCategory,
        isCategoryClicked } }
    >
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
