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

  function allIngredientsChecked() {
    const allIngredients = Object.entries(food).filter(
      (entry) => entry[0].includes('Ingredient'),
    );

    const validIngredients = allIngredients
      .filter((ing) => ing[1])
      .map((ingStr) => ingStr[1]);

    let isEqual = true;

    validIngredients.forEach((ing, index) => {
      if (ing !== usedIngredients[index]) {
        isEqual = false;
      }
    });

    return isEqual;
  }

  useEffect(() => {
    // get food data from API
    fetchFoodByID(foodId).then((data) => setFood(data.meals[0]));
    // Check if there is data in LS, if not, create it
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
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

  useEffect(() => {
    // save ingredients list to LS
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      meals: { ...inProgressRecipes.meals, [foodId]: usedIngredients },
    }));
  }, [usedIngredients, foodId]);

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
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !allIngredientsChecked() }
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}
