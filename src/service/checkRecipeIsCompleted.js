/*
esta função recebe um Id e o dbType de uma receita,
-verifica se todos os ingredientes estão marcados marcados no locastorage 'inProgressRecipes'
-Retorna true, se estiverem, ou false, se não estiveren
*/

function checkRecipeIsCompleted(dbType, id, ingredients) {
  const ingredientsOnLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let isCompleted = false;
  if (ingredientsOnLS && Object.keys(ingredientsOnLS[dbType])[0] === id) {
    isCompleted = ingredientsOnLS[dbType][id].length === ingredients.length;
  }
  return isCompleted;
}

export default checkRecipeIsCompleted;
