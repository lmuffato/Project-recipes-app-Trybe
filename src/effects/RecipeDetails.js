import { useEffect } from 'react';

const getResults = (arrRecipe, currRecipe) => {
  const ARR_LENGTH = 6;
  const arrLenght = arrRecipe.slice(0, ARR_LENGTH);
  const arrCurrRecipe = Object.entries(currRecipe);
  // src: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const arrRecipeIngredients = arrCurrRecipe
    .filter((i) => i[0].match(/strIngredient/gi));
  const arrRecipeMeasureUnit = arrCurrRecipe.filter((i) => i[0].match(/strMeasure/gi));
  return { arrLenght, arrRecipeIngredients, arrRecipeMeasureUnit };
};

function RecipeDetail(history, apiCallbackByID, apiCallBack, stateCallback) {
  const regExp = /[0-9]/gi;
  const getId = history.match(regExp).reduce((acc, item) => acc + item, '');
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
        });
      }
    };
    getCurrMeal();
  }, []);
}

export default RecipeDetail;
