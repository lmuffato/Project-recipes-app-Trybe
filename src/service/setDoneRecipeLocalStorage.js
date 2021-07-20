/*
Esta função deverá registrar informações de receitas feitas
na chave "doneRecipes" do localStorage com o seguinte formato:
[{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}]
A função recebe como parâmetro o id da receita, faz a busca das informações
da receita na API e cria a chave doneDate buscando a data no computador pela
função Date.
*/

import fetchApiById from './fetchApiById';

const generateDoneElement = (recipe, type) => {
  const date = new Date();
  return ({
    id: recipe[`id${type}`],
    type: type === 'Meal' ? 'comida' : 'bebida',
    area: type === 'Meal' ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: type === 'Drink' ? recipe.strAlcoholic : '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    tags: recipe.strTags !== null ? recipe.strTags.split(',') : [],
  });
};

async function setDoneRecipesLocalStorage(dbType, id) {
  const type = dbType === 'themealdb' ? 'Meal' : 'Drink';
  const recipe = await fetchApiById(dbType, id);
  const newDoneRecipe = generateDoneElement(recipe, type);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes !== null) {
    const newDoneRecipes = [...doneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  }
}

export default setDoneRecipesLocalStorage;
