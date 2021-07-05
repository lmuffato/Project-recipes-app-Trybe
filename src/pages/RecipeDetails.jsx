import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DetailsHeader from './components/DetailsPage/DetailsHeader';
import Ingredients from './components/DetailsPage/Ingredients';
import Instructions from './components/DetailsPage/Instructions';
import Video from './components/DetailsPage/Video';
import Recommendations from './components/DetailsPage/Recommendations';
import { getSpecificDrink } from '../actions/drinks';
import { getSpecificMeal } from '../actions/meals';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      dispatch(getSpecificMeal(pathname.split('/comidas/')[1]));
    }
    if (pathname.includes('bebidas')) {
      dispatch(getSpecificDrink(pathname.split('/bebidas/')[1]));
    }
  }, [pathname]); // eslint-disable-line

  return (
    <div>
      <DetailsHeader title="Recipe" />
      <Ingredients ingredients={ ['cebola', 'alho'] } />
      <Instructions />
      <Video />
      <Recommendations recommendations={ [{ name: 'Drink' }] } />
      <button type="button" data-testid="start-recipe-btn">Começar receita</button>
    </div>
  );
}

export default RecipeDetails;
