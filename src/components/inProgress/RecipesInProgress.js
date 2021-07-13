import React, { useContext, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { getMealsById } from '../../services/getMeals';
import { getDrinksById } from '../../services/getDrinks';
import InProgressMeal from './InProgressMeal';
import InProgressDrink from './InProgressDrink';
import Context from '../../context/Context';

export default function RecipesInProgress() {
  const {
    setDrinksId,
    setMealsId,
  } = useContext(Context);
  const location = useLocation();
  const url = location.pathname;
  const match = useRouteMatch();
  const { params: { id } } = match;
  useEffect(() => {
    if (url === `/comidas/${id}/in-progress`) {
      getMealsById(id)
        .then((meal) => {
          setMealsId(meal);
        });
    }
    if (url === `/bebidas/${id}/in-progress`) {
      getDrinksById(id)
        .then((drink) => {
          setDrinksId(drink);
        });
    }
  }, []);

  return (
    <div>
      { url === `/comidas/${id}/in-progress`
        ? <InProgressMeal />
        : <InProgressDrink />}
    </div>
  );
}
