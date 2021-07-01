import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchFoodCategories from '../helpers/fetchInicialCategories';
import { requestCategoriesList } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const { categories } = await fetchFoodCategories();
      dispatch(requestCategoriesList(categories));
    };
    getCategories();
  });

  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default MainFood;
