import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import FoodContext from '../contexts/FoodContext';

import DetailsHeader from '../components/DetailsHeader';

export default function DetalhesComidasIP() {
  const { foods } = useContext(FoodContext);
  const { pathname } = useLocation();
  const foodId = pathname.split('/')[2];

  const foodData = foods.find((food) => food.idMeal === foodId);

  return (
    <div>
      {foodData && (
        <DetailsHeader recipe={ foodData } isFood />
      )}
    </div>
  );
}
