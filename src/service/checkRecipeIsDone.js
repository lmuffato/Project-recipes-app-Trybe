/*
este função recebe um id de uma receita e checa no local storage se
a receita já feita, retornando true se sim e false se não.
*/

function checkRecipeIsDone(id) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeIsDone = doneRecipes !== null ? doneRecipes.reduce((acc, recipe) => {
    if (recipe.id === id) acc = true;
    return acc;
  }, false) : false;
  return recipeIsDone;
}

export default checkRecipeIsDone;
