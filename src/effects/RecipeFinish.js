import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';
import { getItemFromLocalStorage } from '../services/localStorage';

function checkMeals(storage, state, callbackState, ingredients) {
  const ingredientsKeyValue = Object.entries(storage.meals)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  if (ingredientsFromLocalStorage.length === ingredients.length) {
    callbackState({ ...state, finish: true });
  }
  callbackState({ ...state, finish: false });
}

function checkCocktails(storage, state, callbackState, ingredietsArr) {
  console.log('chamou', ingredietsArr);
  const { currIngredientsLocal } = state;
  const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  console.log(ingredientsFromLocalStorage.length, ingredietsArr.length);
  if (ingredientsFromLocalStorage.length === ingredietsArr.length) {
    callbackState({ ...state, finish: true });
  }
  callbackState({ ...state, finish: false });
}

function getMealsStorage(storage, state, callbackState) {
  const ingredientsKeyValue = Object.entries(storage.meals)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  callbackState({ ...state, currIngredientsLocal: ingredientsFromLocalStorage });
}
function getCocktailsStorage(storage, state, callbackState) {
  const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  callbackState({ ...state, currIngredientsLocal: ingredientsFromLocalStorage });
}

export default function RecipeFinish(ingredients, state, callbackState) {
  const { cocktailsIngredients, setCocktailsIngredients } = useContext(CocktailsContext);
  const { currIngredientsLocal, finish } = state;
  const history = useHistory();
  const { pathname } = history.location;
  const regExp = /[0-9]/gi;
  const getId = pathname.match(regExp).reduce((acc, item) => acc + item, '');
  const storage = getItemFromLocalStorage('inProgressRecipes');
  const ingredientsArr = ingredients.map((item) => item[1]);

  useEffect(() => {
    if (pathname.includes('comidas')) {
      return checkMeals(storage, state, callbackState, ingredients);
    }
    checkCocktails(storage, state, callbackState, ingredientsArr);
  }, [cocktailsIngredients]);

  useEffect(() => {
    if (pathname.includes('bebidas')) {
      return getCocktailsStorage(storage, state, callbackState);
    }
    getMealsStorage(storage, state, callbackState);
  }, []);
}
