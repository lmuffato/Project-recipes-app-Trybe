import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';

import { fetchFoodByID } from '../services/mealAPI';

export default function DetalhesComidasIP() {
  const { pathname } = useLocation();
  const foodId = pathname.split('/')[2];
  const [food, setFood] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);

  function handleCheckIngredient(ev) {
    const ingredient = ev.target.value;
    const isUsed = usedIngredients.includes(ingredient);
    if (!isUsed) {
      setUsedIngredients([...usedIngredients, ingredient]);
    } else {
      setUsedIngredients(usedIngredients.filter(((ing) => ing !== ingredient)));
    }
  }

  useEffect(() => {
    fetchFoodByID(foodId).then((data) => setFood(data.meals[0]));
  }, [foodId]);

  useEffect(() => {
    // add ingredients list from LS to usedIngredients
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let foodsInLS = {};
    if (inProgressRecipesLS) {
      foodsInLS = inProgressRecipesLS.meals;
    }

    if (Object.keys(foodsInLS).includes(foodId)) {
      setUsedIngredients(foodsInLS[foodId]);
    }
  }, [foodId]);

  return (
    <div>
      {food && (
        <div>
          <DetailsHeader recipe={ food } isFood />
          <IngredientListCheckbox
            recipe={ food }
            isFood
            handleCheckIngredient={ handleCheckIngredient }
            usedIngredients={ usedIngredients }
          />
          <p data-testid="instructions">{food.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
    </div>
  );
}
