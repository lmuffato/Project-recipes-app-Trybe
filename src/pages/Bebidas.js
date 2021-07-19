import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ALL_DRINKS_ENDPOINT,
  DRINKS_BY_CATEGORY_ENDPOINT,
  DRINKS_BY_INGREDIENT_ENDPOINT } from '../services/drinks';
import { getDrinkCategoriesAPIThunk,
  getDrinkRecipesAPIThunk } from '../redux/actions/drinksAction';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const location = useLocation();
  const selectedCategory = useSelector((state) => state.drinks.selectedCategory);
  useEffect(() => {
    dispatch(getDrinkCategoriesAPIThunk());
  }, [dispatch]);
  useEffect(() => {
    const { fromIngredientsPage, ingredientName } = location.state || {};
    if (fromIngredientsPage) {
      dispatch(
        getDrinkRecipesAPIThunk(DRINKS_BY_INGREDIENT_ENDPOINT(ingredientName)),
      );
    } else dispatch(getDrinkRecipesAPIThunk(pickEndpoint(selectedCategory)));
  }, [dispatch, selectedCategory, location]);
  const loadingRecipes = useSelector((state) => state.loading.loadingRecipes);
  const loadingCategories = useSelector((state) => state.loading.loadingCategories);
  const drinks = useSelector((state) => state.drinks.recipes);

  return (
    <section>
      <Header title="Bebidas" />
      {loadingCategories ? <Loading /> : <DrinksCategoryButtons />}
      {loadingRecipes ? <Loading /> : <DrinksCards drinks={ drinks } />}
      <footer>
        <Footer />
      </footer>
    </section>
  );
}

export default Bebidas;
