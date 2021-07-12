import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSpecificDrink } from '../../actions/drinks';
import { getSpecificMeal } from '../../actions/meals';
import DetailsHeader from './DetailsPage/DetailsHeader';
import Instructions from './DetailsPage/Instructions';
import FinishRecipeBtn from './InProgress/FinishRecipeBtn';
import IngredientsList from './InProgress/IngredientsList';

function Progress() {
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
        <Container key={ recipe.strDrink || recipe.strMeal }>
          <DetailsHeader recipe={ recipe } type={ type } pathname={ pathname } />
          <IngredientsList recipe={ recipe } />
          <Instructions recipe={ recipe } />
          <FinishRecipeBtn />
        </Container>
      ))
  );
}

export default Progress;
