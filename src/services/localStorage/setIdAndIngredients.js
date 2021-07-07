function setIdAndIngredients(id, ingredientsArr, type) {
  const progressOfLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (type === 'meal') {
    progressOfLS.meals[id] = ingredientsArr;
  }
  if (type === 'drink') {
    progressOfLS.cocktails[id] = ingredientsArr;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(progressOfLS));
}

export function returnIngredientsOfId(recipe) {
  const progressOfLS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let ingredients = [];
  const { idDrink, idMeal } = recipe;
  if (idDrink) {
    ingredients = progressOfLS.cocktails[idDrink];
  }
  if (idMeal) {
    ingredients = progressOfLS.meals[idMeal];
  }
  return ingredients;
}
export default setIdAndIngredients;
