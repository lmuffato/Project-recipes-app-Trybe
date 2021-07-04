import { useEffect } from 'react';
import { getItemFromLocalStorage } from '../services/localStorage';

const getResults = (arrRecipe, currRecipe) => {
  const ARR_LENGTH = 6;
  const arrLenght = arrRecipe.slice(0, ARR_LENGTH);
  const arrCurrRecipe = Object.entries(currRecipe);
  // src: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const arrRecipeIngredients = arrCurrRecipe
    .filter((i) => {
      if (!i[1]) return;
      return i[0].match(/strIngredient/gi);
    });
  const arrRecipeMeasureUnit = arrCurrRecipe.filter((i) => {
    if (!i[1]) return;
    return i[0].match(/strMeasure/gi);
  });
  return { arrLenght, arrRecipeIngredients, arrRecipeMeasureUnit };
};

function checkDoneRecipes(id) {
  const doneRecipes = getItemFromLocalStorage('doneRecipes');
  if (!doneRecipes) return false;
  const itemFound = doneRecipes.find((item) => item.id === id);
  if (itemFound) return true;
  return false;
}

function checkInprogressRecipes(id, pathname) {
  const currRecipe = getItemFromLocalStorage('inProgressRecipes');
  if (!currRecipe) return false;
  if (pathname.includes('comida')) {
    if (Number(Object.keys(currRecipe.meals)[0]) === Number(id)) {
      return true;
    }
    return false;
  }
  if (Number(Object.keys(currRecipe.cocktails)[0]) === Number(id)) return true;
  return false;
}

function RecipeDetail(history, apiCallbackByID, apiCallBack, stateCallback) {
  const regExp = /[0-9]/gi;
  const getId = history.match(regExp).reduce((acc, item) => acc + item, '');
  const doneRecipe = checkDoneRecipes(getId);
  const inProgressRecipe = checkInprogressRecipes(getId, history);
  useEffect(() => {
    const getCurrMeal = async () => {
      const recipe = await apiCallbackByID(getId);
      const recipeArr = await apiCallBack();
      if (recipe.drinks && recipeArr.meals) {
        const { drinks: [drink] } = recipe;
        const { meals } = recipeArr;
        const results = getResults(meals, drink);
        const { arrLenght, arrRecipeIngredients, arrRecipeMeasureUnit } = results;
        stateCallback({
          recipe: drink,
          recomends: arrLenght,
          arrRecipeIngredients,
          arrRecipeMeasureUnit,
          doneRecipe,
          inProgress: inProgressRecipe,
        });
      }
      if (recipe.meals && recipeArr.drinks) {
        const { drinks } = recipeArr;
        const { meals: [meal] } = recipe;
        const results = getResults(drinks, meal);
        const { arrLenght, arrRecipeIngredients, arrRecipeMeasureUnit } = results;
        stateCallback({
          recipe: meal,
          recomends: arrLenght,
          arrRecipeIngredients,
          arrRecipeMeasureUnit,
          doneRecipe,
        });
      }
    };
    getCurrMeal();
  }, []);
}

export default RecipeDetail;
