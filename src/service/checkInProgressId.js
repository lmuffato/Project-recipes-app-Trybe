/*
esta função recebe dbType e retorna o id registrado no localstorage chave "inProgressRecipes"
*/

function checkInProgressId(dbType) {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const id = recipeInProgress ? Object.keys(recipeInProgress[dbType])[0] : '';
  console.log(id);
  return id;
}

export default checkInProgressId;
