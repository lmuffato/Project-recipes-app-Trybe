import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';

import { fetchFoodByID } from '../services/mealAPI';

export default function DetalhesComidasIP() {
  const { pathname } = useLocation();
  const foodId = pathname.split('/')[2];
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFoodByID(foodId).then((data) => setFood(data.meals[0]));
  }, [foodId]);

  return (
    <div>
      {food && (
        <div>
          <DetailsHeader recipe={ food } isFood />
          <IngredientListCheckbox recipe={ food } isFood />
          <p data-testid="instructions">{food.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
    </div>
  );
}
