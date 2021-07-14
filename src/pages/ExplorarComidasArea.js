import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MealsCards from '../components/MealsCards';
import Loading from '../components/Loading';
import { ALL_MEALS_ENDPOINT, MEALS_BY_AREA_ENDPOINT } from '../services/meals';
import { getFoodAreasAPIThunk,
  getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import MealsAreasDropdown from '../components/MealsAreasDropdown';

const pickEndpoint = (category) => {
  switch (category) {
  case 'All':
    return ALL_MEALS_ENDPOINT;
  default:
    return MEALS_BY_AREA_ENDPOINT(category);
  }
};
function ExplorarComidasArea() {
  const dispatch = useDispatch();
  const selectedArea = useSelector((state) => state.meals.selectedArea);
  useEffect(() => {
    dispatch(getFoodAreasAPIThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFoodRecipesAPIThunk(pickEndpoint(selectedArea)));
  }, [dispatch, selectedArea]);
  const loadingRecipes = useSelector((state) => state.loading.loadingRecipes);
  const loadingAreas = useSelector((state) => state.loading.loadingAreas);
  const meals = useSelector((state) => state.meals.recipes);

  return (
    <section>
      <Header title="Explorar Origem" />
      {loadingAreas ? <Loading /> : <MealsAreasDropdown />}
      {loadingRecipes ? <Loading /> : <MealsCards meals={ meals } />}
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default ExplorarComidasArea;
