import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';

import { fetchDrinkByID } from '../services/cocktailAPI';

export default function DetalhesBebidasIP() {
  const { pathname } = useLocation();
  const drinkId = pathname.split('/')[2];
  const [drink, setDrink] = useState({});

  useEffect(() => {
    fetchDrinkByID(drinkId).then((data) => setDrink(data.drinks[0]));
  }, [drinkId]);

  return (
    <div>
      {drink && (
        <div>
          <DetailsHeader recipe={ drink } isDrink />
          <IngredientListCheckbox recipe={ drink } isDrink />
          <p data-testid="instructions">{drink.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
    </div>
  );
}
