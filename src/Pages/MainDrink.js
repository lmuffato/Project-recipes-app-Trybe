import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchDrinks from '../helpers/fetchInitialDrinks';
import { requestInitialDrinks } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import RecipeCards from '../components/RecipeCards';
import MainDrinksCards from '../components/MainDrinksCards';

function MainDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getDrinks = async () => {
      const { drinks } = await fetchDrinks();
      dispatch(requestInitialDrinks(drinks));
    };
    getDrinks();
  });
  return (
    <>
      <Header props={ { search: true, title: 'Bebidas' } } />
      <MainDrinksCards />
      {/* <RecipeCards /> */}
      <Footer />
    </>
  );
}

export default MainDrink;
