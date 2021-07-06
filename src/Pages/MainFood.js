import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchInitialMeals from '../helpers/fetchInicialMeals';
import fetchFoodCategories from '../helpers/fetchFoodCategories';
import { requestRecipies, setInitialMeals, actionFoodCategory } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import FilterButtons from '../components/CategoryButtons';

function MainFood() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.searchReducer.isLoading);
  const loading = <h1>Loading...</h1>;

  useEffect(() => {
    const getMeals = async () => {
      dispatch(requestRecipies());
      const { meals } = await fetchInitialMeals();
      dispatch(setInitialMeals(meals));
    };
    const fecthMealsCategory = async () => {
      const { meals } = await fetchFoodCategories();
      dispatch(actionFoodCategory(meals));
    };

    fecthMealsCategory();
    getMeals();
  }, [dispatch]);

  return (
    <>
      <Header props={ { search: true, title: 'Comidas' } } />
      { isLoading ? '' : <FilterButtons props="Meals" /> }
      { isLoading ? loading : <RecipeCards /> }
      <Footer />
    </>
  );
}

export default MainFood;
