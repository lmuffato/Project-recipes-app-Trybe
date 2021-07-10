import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';
import { getItemFromLocalStorage } from '../services/localStorage';

function checkMeals(mealsIngredients, state, callbackState, ingredients) {
  if (mealsIngredients.length === ingredients.length) {
    return callbackState({ ...state, finish: true });
  }
  callbackState({ ...state, finish: false });
}

function checkCocktails(cocktailsIngredients, state, callbackState, ingredietsArr) {
  if (cocktailsIngredients.length === ingredietsArr.length) {
    return callbackState({ ...state, finish: true });
  }
  callbackState({ ...state, finish: false });
}

function getMealsStorage(storage, state, callbackState, setMealsIngredients) {
  const ingredientsKeyValue = Object.entries(storage.meals)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  setMealsIngredients(ingredientsFromLocalStorage);
  callbackState({ ...state, currIngredientsLocal: ingredientsFromLocalStorage });
}
function getCocktailsStorage(storage, state, callbackState, setCocktailsIngredients) {
  const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  setCocktailsIngredients(ingredientsFromLocalStorage);
  callbackState({ ...state, currIngredientsLocal: ingredientsFromLocalStorage });
}

export default function RecipeFinish(ingredients, state, callbackState) {
  const { cocktailsIngredients, setCocktailsIngredients } = useContext(CocktailsContext);
  const { mealsIngredients, setMealsIngredients } = useContext(MealsContext);
  const history = useHistory();
  const { pathname } = history.location;
  const storage = getItemFromLocalStorage('inProgressRecipes');
  const ingredientsArr = ingredients.map((item) => item[1]);

  useEffect(() => {
    if (pathname.includes('bebidas')) {
      return checkCocktails(cocktailsIngredients, state, callbackState, ingredientsArr);
    }
    checkMeals(mealsIngredients, state, callbackState, ingredientsArr);
  }, [cocktailsIngredients, mealsIngredients]);

  useEffect(() => {
    if (pathname.includes('bebidas')) {
      if (!storage) return;
      return getCocktailsStorage(storage, state, callbackState, setCocktailsIngredients);
    }
    if (!storage) return;
    getMealsStorage(storage, state, callbackState, setMealsIngredients);
  }, []);
}
