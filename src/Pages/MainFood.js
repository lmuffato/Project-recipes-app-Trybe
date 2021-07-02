import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchFoodCategories from '../helpers/fetchInicialMeals';
import { requestInitialMeals } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCategories from '../components/MainFoodMeals';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getMeals = async () => {
      const { meals } = await fetchFoodCategories();
      dispatch(requestInitialMeals(meals));
    };
    getMeals();
  });

  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      <RecipeCategories />
      <Footer />
    </>
  );
}

export default MainFood;
