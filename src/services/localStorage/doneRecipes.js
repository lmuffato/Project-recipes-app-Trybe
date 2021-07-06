// https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function dataAtualFormatada() {
  const data = new Date();
  const dia = data.getDate().toString();
  const diaF = (dia.length === 1) ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
  const mesF = (mes.length === 1) ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

export function verifyDoneRecipesInLS(id) {
  if (!localStorage.getItem('doneRecipes')) return false;
  // const { idDrink, idMeal } = recipe;
  const doneArr = JSON.parse(localStorage.getItem('doneRecipes'));
  let exist = false;
  doneArr.forEach((recipeDone) => {
    if (recipeDone.id === id) {
      exist = true;
    }
  });
  return exist;
}

function doneRecipes(recipe) {
  // console.log(recipe);
  // tenta buscar doneRecipes no LS
  const doneRecipesConst = JSON.parse(localStorage.getItem('doneRecipes'));
  // monta objeto com variaveis q irão p/ o LS
  const { idDrink, idMeal, strArea, strCategory, strAlcoholic,
    strDrink, strMeal, strDrinkThumb, strMealThumb, strTags } = recipe;
  if (doneRecipesConst.length === 0) {
    doneRecipesConst.push({
      id: idDrink || idMeal,
      type: idDrink ? 'bebida' : 'comida',
      area: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strDrinkThumb || strMealThumb,
      doneDate: dataAtualFormatada(),
      tags: strTags || [],
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesConst));
  }
}

export default doneRecipes;
