import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';

const addIngredientToLocalStorage = (pathname, state, storage, setglobalIngredients) => {
  const { currIngredients, setCurrIngredients,
    setCurrMealsIngredients, currMealsIngredients } = setglobalIngredients;
  const { currIngredient } = state;
  const regExp = /[0-9]/gi;
  const getId = pathname.match(regExp).reduce((acc, item) => acc + item, '');
  if (pathname.includes('bebidas')) {
    if (!storage) {
      storage = { ...storage, cocktails: { [getId]: currIngredient } };
      setCurrIngredients(currIngredient);
      return setToLocalStorage('inProgressRecipes', storage);
    }
    const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
    const ingredients = ingredientsKeyValue[1];
    if (ingredients.includes(currIngredient)) {
      const index = ingredients.indexOf(currIngredient);
      ingredients.splice(index, 1);
      setCurrIngredients(ingredients);
      storage = { ...storage, cocktails: { [getId]: ingredients } };
      return setToLocalStorage('inProgressRecipes', storage);
    }
    storage = { ...storage,
      cocktails: { [getId]: [...storage.cocktails[getId], currIngredient] } };
    setCurrIngredients([...currIngredients, currIngredient]);
    return setToLocalStorage('inProgressRecipes', storage);
  }
  if (pathname.includes('comidas')) {
    if (!storage) {
      storage = { meals: { [getId]: currIngredient } };
      setCurrMealsIngredients(currIngredient);
      return setToLocalStorage('inProgressRecipes', storage);
    }
    const ingredientsKeyValue = Object.entries(storage.meals)[0];
    const ingredients = ingredientsKeyValue[1];
    if (ingredients.includes(currIngredient)) {
      const index = ingredients.indexOf(currIngredient);
      ingredients.splice(index, 1);
      setCurrMealsIngredients(ingredients);
      storage = { ...storage, meals: { [getId]: ingredients } };
      return setToLocalStorage('inProgressRecipes', storage);
    }
    storage = { ...storage,
      meals: { [getId]: [...storage.meals[getId], currIngredient] } };
    setCurrMealsIngredients([...currMealsIngredients, currIngredient]);
    return setToLocalStorage('inProgressRecipes', storage);
  }
};

function renderCheckboxChecked(state, callbackState, storage, pathname) {
  if (pathname.includes('bebidas')) {
    const ingredientsKeyValue = Object.entries(storage.cocktails)[0];
    const ingredients = ingredientsKeyValue[1];
    return callbackState({ ...state,
      arrFromLocalStorage: ingredients });
  }
  const ingredientsKeyValue = Object.entries(storage.meals)[0];
  const ingredients = ingredientsKeyValue[1];
  return callbackState({ ...state,
    arrFromLocalStorage: ingredients });
}

export default function CheckIngredient(ingredients, state, callbackState) {
  const { currIngredients, setCurrIngredients } = useContext(CocktailsContext);
  const { currMealsIngredients, setCurrMealsIngredients } = useContext(MealsContext);
  const setglobalIngredients = { currIngredients,
    setCurrIngredients,
    currMealsIngredients,
    setCurrMealsIngredients };
  const { filterIngredients, checkLocalStorage, currIngredient } = state;
  const history = useHistory();
  const { pathname } = history.location;
  const regExp = /[0-9]/gi;
  const getId = pathname.match(regExp).reduce((acc, item) => acc + item, '');
  let storage = getItemFromLocalStorage('inProgressRecipes');
  const ingredientsStorage = ingredients.map((item) => item[1]);
  useEffect(() => {
    if (!currIngredient) return;
    addIngredientToLocalStorage(pathname, state, storage, setglobalIngredients);
  }, [filterIngredients, currIngredient]);
  useEffect(() => {
    callbackState({ ...state, ingredientsInit: ingredientsStorage });
  }, [ingredients]);
  useEffect(() => {
    const getLocalStorage = () => {
      if (pathname.includes('comidas')) {
        if (!storage) {
          storage = { meals: { [getId]: [] } };
          return setToLocalStorage('inProgressRecipes', storage);
        }
        const ingredientsKeyValue = Object.entries(storage.meals)[0];
        const ingredientsFromLocalStorage = ingredientsKeyValue[1];
        if (ingredientsFromLocalStorage.length > 0) {
          return callbackState({ ...ingredientsStorage, checkLocalStorage: true });
        }
        return;
      }
      if (!storage) {
        storage = { cocktails: { [getId]: [] } };
        return setToLocalStorage('inProgressRecipes', storage);
      }
      if (storage.cocktails[getId].length > 0) {
        return callbackState({ ...ingredientsStorage, checkLocalStorage: true });
      }
    };
    getLocalStorage();
  }, []);

  useEffect(() => {
    renderCheckboxChecked(state, callbackState, storage, pathname);
  }, [checkLocalStorage]);
}
