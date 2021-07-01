import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../components/Footer';
import { ALL_DRINKS_ENDPOINT, DRINKS_BY_CATEGORY_ENDPOINT } from '../services/drinks';
import { getDrinkCategoriesAPIThunk,
  getDrinkRecipesAPIThunk } from '../redux/actions/drinksAction';
import Loading from '../components/Loading';
import DrinksCategoryButtons from '../components/DrinksCategoryButtons';
import DrinksCards from '../components/DrinksCards';

const pickEndpoint = (category) => {
  switch (category) {
  case 'All':
    return ALL_DRINKS_ENDPOINT;
  default:
    return DRINKS_BY_CATEGORY_ENDPOINT(category);
  }
};

function Bebidas() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.drinks.selectedCategory);
  useEffect(() => {
    dispatch(getDrinkCategoriesAPIThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDrinkRecipesAPIThunk(pickEndpoint(selectedCategory)));
  }, [dispatch, selectedCategory]);
  const loadingRecipes = useSelector((state) => state.drinks.loadingRecipes);
  const loadingCategories = useSelector((state) => state.drinks.loadingCategories);

  return (
    <>
      {loadingCategories ? <Loading /> : <DrinksCategoryButtons />}
      {loadingRecipes ? <Loading /> : <DrinksCards />}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Bebidas;
