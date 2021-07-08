import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';
import { getItemFromLocalStorage } from '../services/localStorage';

const getLocalStorage = (storage, pathname,
  getoToLocalIngredients, getToGlobalIngredients) => {
  const { currIngredients, setCurrIngredients,
    currMealIngredients, setCurrMealsIngredients } = getToGlobalIngredients;
  const { state, callbackState, ingredients } = getoToLocalIngredients;
  const { currIngredientsLocal, finish } = state;
  if (!storage) return;
  if (pathname.includes('comidas')) {
    const ingredientsKeyValue = Object.entries(storage.meals)[0];
    const ingredientsFromLocalStorage = ingredientsKeyValue[1];
    if (ingredientsFromLocalStorage.length === ingredients.length) {
      setCurrMealsIngredients(ingredientsFromLocalStorage);
      return callbackState({ ...state,
        currIngredientsLocal: ingredientsFromLocalStorage,
        finish: true });
    }
    if (ingredientsFromLocalStorage.length > 0) {
      setCurrMealsIngredients(ingredientsFromLocalStorage);
      return callbackState({ ...state,
        currIngredientsLocal: ingredientsFromLocalStorage,
        finish: false });
    }
    return callbackState({ ...state,
      currIngredientsLocal: [],
      finish: false });
  }
  const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
  const ingredientsFromLocalStorage = ingredientsKeyValue[1];
  if (ingredientsFromLocalStorage.length === ingredients.length) {
    setCurrIngredients(ingredientsFromLocalStorage);
    return callbackState({ ...state,
      currIngredientsLocal: ingredientsFromLocalStorage,
      finish: true });
  }
  if (ingredientsFromLocalStorage.length > 0) {
    setCurrIngredients(ingredientsFromLocalStorage);
    return callbackState({ ...state,
      currIngredientsLocal: ingredientsFromLocalStorage,
      finish: false });
  }
  return callbackState({ ...state,
    currIngredientsLocal: [],
    finish: false });
};

export default function RecipeFinish(ingredients, state, callbackState) {
  const { currIngredients, setCurrIngredients } = useContext(CocktailsContext);
  const { currMealIngredients, setCurrMealsIngredients } = useContext(MealsContext);
  const { currIngredientsLocal, finish } = state;
  const getToGlobalIngredients = { currIngredients,
    setCurrIngredients,
    currMealIngredients,
    setCurrMealsIngredients };
  const getoToLocalIngredients = { state, callbackState, ingredients };
  const history = useHistory();
  const { pathname } = history.location;
  const regExp = /[0-9]/gi;
  const getId = pathname.match(regExp).reduce((acc, item) => acc + item, '');
  const storage = getItemFromLocalStorage('inProgressRecipes');
  const ingredientsStorage = ingredients.map((item) => item[1]);

  useEffect(() => {
    getLocalStorage(storage, pathname, getoToLocalIngredients, getToGlobalIngredients);
  }, [ingredients]);
}
