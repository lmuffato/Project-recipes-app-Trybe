import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import DrinkIngredientCard from '../components/DrinkIngredientCard';
import { getDrinksIngredientsAPIThunk } from '../redux/actions/drinksAction';

function ExplorarBebidasIngredientes() {
  // const ingredients = useSelector((state) => state.drinks.ingredients);
  const loadingIngredients = useSelector((state) => state.loading.loadingIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrinksIngredientsAPIThunk());
  }, [dispatch]);

  return (
    <section>
      <Header title="Explorar Ingredientes" show={ false } />
      {loadingIngredients ? <Loading /> : <DrinkIngredientCard />}
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default ExplorarBebidasIngredientes;
