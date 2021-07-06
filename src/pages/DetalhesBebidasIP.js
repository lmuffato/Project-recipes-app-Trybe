import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';

import DetailsHeader from '../components/DetailsHeader';

export default function DetalhesBebidasIP() {
  const { drinks } = useContext(DrinkContext);
  const { pathname } = useLocation();
  const drinkId = pathname.split('/')[2];

  const drinkData = drinks.find((drink) => drink.idDrink === drinkId);

  return (
    <div>
      {drinkData && (
        <DetailsHeader recipe={ drinkData } isDrink />
      )}
    </div>
  );
}
