/* eslint-disable no-alert */
// https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
// import { Redirect } from 'react-router';

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
  const doneArr = JSON.parse(localStorage.getItem('doneRecipes'));
  let exist = false;
  doneArr.forEach((recipeDone) => {
    if (recipeDone.id === id) {
      exist = true;
    }
  });
  return exist;
}

function removeRecipeFromProgress(id, type) { // falta implementar esta função
  // const { idDrink, idMeal } = recipe;
  const progressFromLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (type === 'drink') {
    console.log(`Removendo drink ${id}`);
    delete progressFromLS.cocktails[id];
  }
  if (type === 'meal') {
    console.log(`Removendo meal ${id}`);
    delete progressFromLS.meals[id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(progressFromLS));
}

const doneFood = ((recipe, doneRecipesConst) => (
  doneRecipesConst.push({
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
    doneDate: dataAtualFormatada(),
    tags: recipe.strTags.split(','),
  })
));

function doneRecipes(recipe) {
  // tenta buscar doneRecipes no LS
  const { recipeFood, recipeDrink } = recipe;
  const doneRecipesConst = JSON.parse(localStorage.getItem('doneRecipes'));
  // monta objeto com variaveis q irão p/ o LS
  const { idDrink, idMeal, strArea, strCategory, strAlcoholic,
    strDrink, strDrinkThumb, strTags } = recipeDrink || recipeFood;
  console.log(strTags);
  removeRecipeFromProgress(idDrink || idMeal, idDrink ? 'drink' : 'meal'); // ao colocar uma receita em doneRecipe, devemos remover de progress.
  if (verifyDoneRecipesInLS(idDrink || idMeal)) {
    global.alert('Não é possível finalizar uma receita já finalizada!');
    return null;
  }
  if (typeof strTags === 'string') {
    doneFood(recipeFood, doneRecipesConst);
  } else {
    doneRecipesConst.push({
      id: idDrink,
      type: 'bebida',
      area: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink,
      image: strDrinkThumb,
      doneDate: dataAtualFormatada(),
      tags: strTags || [],
    });
  }
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesConst));
}

export default doneRecipes;
