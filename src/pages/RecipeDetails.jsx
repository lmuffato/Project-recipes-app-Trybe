import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailsHeader from './components/DetailsPage/DetailsHeader';
import Ingredients from './components/DetailsPage/Ingredients';
import Instructions from './components/DetailsPage/Instructions';
import Video from './components/DetailsPage/Video';
import Recommendations from './components/DetailsPage/Recommendations';
import { getSpecificDrink } from '../actions/drinks';
import { getSpecificMeal } from '../actions/meals';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const type = pathname.includes('comidas') ? 'meals' : 'drinks';
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    if (type === 'meals') {
      return state.meals.loading;
    }
    if (type === 'drinks') {
      return state.drinks.loading;
    }
  });
  const data = useSelector((state) => {
    if (type === 'meals') {
      return state.meals.specificMeal;
    }
    if (type === 'drinks') {
      return state.drinks.specificDrink;
    }
  });

  useEffect(() => {
    if (type === 'meals') {
      dispatch(getSpecificMeal(pathname.split('/comidas/')[1]));
    }
    if (type === 'drinks') {
      dispatch(getSpecificDrink(pathname.split('/bebidas/')[1]));
    }
  }, [pathname]); // eslint-disable-line

  return (
    loading ? null
      : data.map((recipe) => (
        <div key={ recipe.strDrink || recipe.strMeal }>
          <DetailsHeader recipe={ recipe } />
          <Ingredients recipe={ recipe } />
          <Instructions recipe={ recipe } />
          <Video recipe={ recipe } />
          <Recommendations type={ type } />
          <button type="button" data-testid="start-recipe-btn">Começar receita</button>
        </div>
      ))
  );
}

export default RecipeDetails;
