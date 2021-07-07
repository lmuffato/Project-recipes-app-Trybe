import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';

export default function RecipeInit(state) {
  const history = useHistory();
  const { recipe, recipeInit } = state;
  useEffect(() => {
    let storageItem = getItemFromLocalStorage('inProgressRecipes');
    if (!recipeInit) return;
    const { pathname } = history.location;
    if (pathname.includes('comidas')) {
      const { idMeal } = recipe;
      const meals = { [idMeal]: [] };
      storageItem = { ...storageItem, meals };
      setToLocalStorage('inProgressRecipes', storageItem);
      return history.push(`/comidas/${idMeal}/in-progress`);
    }
    const { idDrink } = recipe;
    const cocktails = { [idDrink]: [] };
    storageItem = { ...storageItem, cocktails };
    setToLocalStorage('inProgressRecipes', storageItem);
    return history.push(`/bebidas/${idDrink}/in-progress`);
  }, [recipeInit]);
}
