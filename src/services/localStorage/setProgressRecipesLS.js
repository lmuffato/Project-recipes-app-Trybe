export function verifyProgressInLS(id, type) {
  const progressFromLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!progressFromLS) return false;
  // verifica meals
  let exist = false;
  if (type === 'meal') {
    const keysOfMeals = Object.keys(progressFromLS.meals); // arr
    if (!keysOfMeals) exist = false; // não há chaves no objeto meals
    keysOfMeals.forEach((key) => {
      if (key === id) exist = true;
    });
  }
  // verifica drinks
  if (type === 'drink') {
    const keysOfDrinks = Object.keys(progressFromLS.cocktails);
    if (!keysOfDrinks) exist = false; // não há chaves no objeto cocktails
    keysOfDrinks.forEach((key) => {
      if (key === id) exist = true;
    });
  }
  return exist;
}

function addRecipeInProgress(recipe) {
  const { idDrink, idMeal } = recipe;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (idDrink) {
    inProgressRecipes.cocktails = {
      ...inProgressRecipes.cocktails,
      [idDrink]: [],
    };
  }

  if (idMeal) {
    inProgressRecipes.meals = {
      ...inProgressRecipes.meals,
      [idMeal]: [],
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

function setProgressRecipesLS(recipe) {
  const { idDrink, idMeal } = recipe;
  const exist = verifyProgressInLS(idDrink || idMeal, idDrink ? 'drink' : 'meal');
  if (!exist) { // se não existe o id passado e não existe idDrink, o que foi passado foi um recipe meals!
    addRecipeInProgress(recipe);
  }
}

export default setProgressRecipesLS;
