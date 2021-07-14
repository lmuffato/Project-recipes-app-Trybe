import React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import InProgressMeal from './InProgressMeal';
import InProgressDrink from './InProgressDrink';

export default function RecipesInProgress() {
  const location = useLocation();
  const url = location.pathname;
  const match = useRouteMatch();
  const { params: { id } } = match;

  return (
    <div>
      { url === `/comidas/${id}/in-progress`
        ? <InProgressMeal />
        : <InProgressDrink />}
    </div>
  );
}
