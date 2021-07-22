import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';
import DoneRecipesContext from '../contexts/DoneRecipesContext';
import FoodContext from '../contexts/FoodContext';

import { fetchFoodByID } from '../services/mealAPI';

// PS: This Page contains CSS InLine

export default function DetalhesComidasIP() {
  const { pathname } = useLocation();
  const foodId = pathname.split('/')[2];

  const [food, setFood] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);

  const { doneRecipes, setDoneRecipes } = useContext(DoneRecipesContext);
  const context = useContext(FoodContext);
  const { color: { colorP } } = context;

  function handleCheckIngredient(ev) {
    // adds or removes clicked ingredient from usedIngredients list
    const ingredient = ev.target.value;
    const isUsed = usedIngredients.includes(ingredient);
    if (!isUsed) {
      setUsedIngredients([...usedIngredients, ingredient]);
    } else {
      setUsedIngredients(usedIngredients.filter(((ing) => ing !== ingredient)));
    }
  }

  function allIngredientsChecked() {
    // return true if all ingredients are checked
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

  const history = useHistory();
  function finishRecipe() {
    const doneRecipesIds = doneRecipes.map(((doceRecipe) => doceRecipe.id));
    const isAlreadyDone = doneRecipesIds.includes(food.idMeal);

    const now = new Date();
    const dateString = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

    if (!isAlreadyDone) {
      setDoneRecipes([...doneRecipes, {
        id: food.idMeal,
        type: 'comida',
        area: food.strArea ? food.strArea : '',
        category: food.strCategory ? food.strCategory : '',
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
        doneDate: `Feita em: ${dateString}`,
        tags: food.strTags ? [food.strTags.split(',')] : [],
      }]);
    }
    history.push('/receitas-feitas');
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
          <br />
          <IngredientListCheckbox
            recipe={ food }
            isFood
            handleCheckIngredient={ handleCheckIngredient }
            usedIngredients={ usedIngredients }
          />
          <br />
          <p
            data-testid="instructions"
            style={ { margin: 15, color: colorP } }
          >
            {food.strInstructions}
          </p>
          <br />
          <button
            className="button is-primary"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !allIngredientsChecked() }
            onClick={ () => finishRecipe() }
          >
            Finish Recipe
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
