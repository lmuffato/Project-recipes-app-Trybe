import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchFoodCategories from '../helpers/fetchInicialCategories';
import { requestCategoriesList } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import RecipeCards from '../components/RecipeCards';
import RecipeCategories from '../components/RecipeCategories';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const { meals } = await fetchFoodCategories();
      dispatch(requestCategoriesList(meals));
    };
    getCategories();
  });

  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      <RecipeCategories />
      {/* <RecipeCards /> */}
      <Footer />
    </>
  );
}

export default MainFood;
