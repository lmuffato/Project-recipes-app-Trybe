/*
Esta função recebe um valor de ingrediente como parametro, verifica se ele existe no localstorage e
retorna true, caso sim, ou false, caso não
*/

function checkIngredientIsDone(dbType, id, ingredient) {
  const ingredientsOnLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let lineThrough = false;
  if (ingredientsOnLS && Object.keys(ingredientsOnLS[dbType])[0] === id) {
    lineThrough = ingredientsOnLS[dbType][id]
      .reduce((acc, doneIngredient) => {
        if (doneIngredient.includes(ingredient)) acc = true;
        return acc;
      }, false);
  }
  return lineThrough;
}

export default checkIngredientIsDone;
