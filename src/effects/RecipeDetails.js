import { useEffect } from 'react';

function RecipeDetail(history, apiCallbackByID, apiCallBack, stateCallback) {
  const regExp = /[0-9]/gi;
  const getId = history.match(regExp).reduce((acc, item) => acc + item, '');
  useEffect(() => {
    const getCurrMeal = async () => {
      const recipe = await apiCallbackByID(getId);
      const recipeArr = await apiCallBack();
      const { drinks: [drink] } = recipe;
      const { meals } = recipeArr;
      const ARR_LENGTH = 6;
      const arrLenght = meals.slice(0, ARR_LENGTH);
      const arrRecipe = Object.entries(drink);
      // src: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
      const arrRecipeIngredients = arrRecipe
        .filter((i) => i[0].match(/strIngredient/gi));
      const arrRecipeMeasureUnit = arrRecipe.filter((i) => i[0].match(/strMeasure/gi));
      stateCallback({
        recipe: drink,
        recomends: arrLenght,
        arrRecipeIngredients,
        arrRecipeMeasureUnit,
      });
    };
    getCurrMeal();
  }, []);
}

export default RecipeDetail;
