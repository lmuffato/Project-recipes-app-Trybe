import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';

import { fetchDrinkByID } from '../services/cocktailAPI';

export default function DetalhesBebidasIP() {
  const { pathname } = useLocation();
  const drinkId = pathname.split('/')[2];
  const [drink, setDrink] = useState({});
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
    fetchDrinkByID(drinkId).then((data) => setDrink(data.drinks[0]));
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, [drinkId]);

  useEffect(() => {
    // add ingredients list from LS to usedIngredients
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let drinksInLS = {};
    if (inProgressRecipesLS) {
      drinksInLS = inProgressRecipesLS.cocktails;
    }

    if (Object.keys(drinksInLS).includes(drinkId)) {
      setUsedIngredients(drinksInLS[drinkId]);
    }
  }, [drinkId]);

  useEffect(() => {
    // save ingredients list to LS
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      cocktails: { ...inProgressRecipes.cocktails, [drinkId]: usedIngredients },
    }));
  }, [usedIngredients, drinkId]);

  return (
    <div>
      {drink && (
        <div>
          <DetailsHeader recipe={ drink } isDrink />
          <IngredientListCheckbox
            recipe={ drink }
            isDrink
            handleCheckIngredient={ handleCheckIngredient }
            usedIngredients={ usedIngredients }
          />
          <p data-testid="instructions">{drink.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
    </div>
  );
}
