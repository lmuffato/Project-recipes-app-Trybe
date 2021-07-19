import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import IngredientCard from '../components/IngredientCard';
import { getMealsIngredientsAPIThunk } from '../redux/actions/mealsAction';

function ExplorarComidasIngredientes() {
  // const ingredients = useSelector((state) => state.meals.ingredients);
  const loadingIngredients = useSelector((state) => state.loading.loadingIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMealsIngredientsAPIThunk());
  }, [dispatch]);

  return (
    <section>
      <Header title="Explorar Ingredientes" show={ false } />
      {loadingIngredients ? <Loading /> : <IngredientCard />}
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default ExplorarComidasIngredientes;
