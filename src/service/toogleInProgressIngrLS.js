/*
Esta função recebe como parametro o tipo de banco de dados (dbType), o id da receita e um ingrediente (ingredient)
- A função recupera no local storage na chave 'inProgressRecipes' / 'cocktails' para bebidas e "meals" para comidas
- é testado se existe uma chave com o mesmo id da receita:
  - Caso a chave exista é testado se existe algum ingrediente já registrado com este conteúdo:
    - se exitir o conteudo do local storage é atualizado SEM o valor de ingredient
    - senão existir o consteúdo do local storage é atualizado COM o valor de ingredient
  -caso a chave não exista, é criada uma chave nomeada pelo id e com um array contendo o valor de ingredient
 */

function toogleInProgressIngrLS(dbType, id, ingredient) {
  const ingredientsOnLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let ingredientsList = [ingredient];
  if (ingredientsOnLS && Object.keys(ingredientsOnLS[dbType])[0] === id) {
    ingredientsList = ingredientsOnLS[dbType][id]
      .filter((doneIngredient) => !doneIngredient.includes(ingredient));
    if (ingredientsList.length === ingredientsOnLS[dbType][id].length) {
      ingredientsList.push(ingredient);
    }
  }
  const newIngredientsOnLs = {
    [dbType]: {
      [id]: ingredientsList,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newIngredientsOnLs));
}

export default toogleInProgressIngrLS;
