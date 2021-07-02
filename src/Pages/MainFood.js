import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchInitialMeals from '../helpers/fetchInicialMeals';
import { requestInitialMeals } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import FilterButtons from '../components/CategoryButtons';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getMeals = async () => {
      const { meals } = await fetchInitialMeals();
      dispatch(requestInitialMeals(meals));
    };
    getMeals();
  });

  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      <FilterButtons props="Food" />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default MainFood;
