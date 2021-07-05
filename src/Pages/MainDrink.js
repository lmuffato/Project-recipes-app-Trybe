import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchDrinks from '../helpers/fetchInitialDrinks';
import { requestRecipies, requestInitialDrinks } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import FilterButtons from '../components/CategoryButtons';

function MainDrink() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.searchReducer.isLoading);
  const loading = <h2>Loading...</h2>;

  useEffect(() => {
    const getDrinks = async () => {
      dispatch(requestRecipies());
      const { drinks } = await fetchDrinks();
      dispatch(requestInitialDrinks(drinks));
    };
    getDrinks();
  }, [dispatch]);
  return (
    <>
      <Header props={ { search: true, title: 'Bebidas' } } />
      <FilterButtons props="Drinks" />
      { isLoading ? loading : <RecipeCards /> }
      <Footer />
    </>
  );
}

export default MainDrink;
