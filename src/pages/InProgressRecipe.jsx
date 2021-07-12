import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailsHeader from './components/DetailsPage/DetailsHeader';
import Ingredients from './components/InProgressRecipePage/Ingredients';
import Instructions from './components/DetailsPage/Instructions';
import FinishRecipeBtn from './components/InProgressRecipePage/FinishRecipeBtn';
import { getSpecificDrink } from '../actions/drinks';
import { getSpecificMeal } from '../actions/meals';
import './RecipeDetails.css';

function RecipeDetails() {
  const [inProgressUpdate, setInprogressUpdate] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
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
      dispatch(getSpecificMeal(pathname.split('/')[2]));
    }
    if (type === 'drinks') {
      dispatch(getSpecificDrink(pathname.split('/')[2]));
    }
  }, [pathname]); // eslint-disable-line

  return (
    loading ? null
      : data.map((recipe) => (
        <div key={ recipe.strDrink || recipe.strMeal }>
          <DetailsHeader recipe={ recipe } type={ type } pathname={ pathname } />
          <Ingredients
            recipe={ recipe }
            inProgressUpdate={ inProgressUpdate }
            setInprogressUpdate={ setInprogressUpdate }
          />
          <Instructions recipe={ recipe } />
          <FinishRecipeBtn
            inProgressUpdate={ inProgressUpdate }
            pathname={ pathname }
            recipe={ recipe }
            type={ type }
          />
        </div>
      ))
  );
}

export default RecipeDetails;
