import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFoodCategoriesAPIThunk, getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import Loading from '../components/Loading';
import MealsCategoryButtons from '../components/MealsCategoryButtons';
import MealsCards from '../components/MealsCards';
import { ALL_MEALS_ENDPOINT, MEALS_BY_CATEGORY_ENDPOINT } from '../services';

const pickEndpoint = (category) => {
  switch (category) {
  case 'All':
    return ALL_MEALS_ENDPOINT;
  default:
    return MEALS_BY_CATEGORY_ENDPOINT(category);
  }
};
function Comidas() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.meals.selectedCategory);
  useEffect(() => {
    dispatch(getFoodCategoriesAPIThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFoodRecipesAPIThunk(pickEndpoint(selectedCategory)));
  }, [dispatch, selectedCategory]);
  const loadingRecipes = useSelector((state) => state.meals.loadingRecipes);
  const loadingCategories = useSelector((state) => state.meals.loadingCategories);

  return (
    <>
      {loadingCategories ? <Loading /> : <MealsCategoryButtons />}
      {loadingRecipes ? <Loading /> : <MealsCards />}
    </>
  );
}

export default Comidas;
