/*
Função responsável por adicionar e remover elemento da chave "favoriteRecipes"
do localStorage com o seguinte formato:
[{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}]
- recebe como parâmetro o id da receita e busca as demais informações na API.
- Caso o id da receita já exista na chave 'favoriteRecipes', a função remove este objeto do array
*/
import fetchApiById from './fetchApiById';

const generateFavoriteElement = (recipe, type) => ({
  id: recipe[`id${type}`],
  type: type === 'Meal' ? 'comida' : 'bebida',
  area: type === 'Meal' ? recipe.strArea : '',
  category: recipe.strCategory,
  alcoholicOrNot: type === 'Drink' ? recipe.strAlcoholic : '',
  name: recipe[`str${type}`],
  image: recipe[`str${type}Thumb`],
});

async function setFavoriteLocalStorage(typeRecipe, id) {
  const type = typeRecipe === 'themealdb' ? 'Meal' : 'Drink';
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    let newFavorites = [];
    if (favoriteRecipes.find((recipe) => recipe.id === id)) {
      newFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
    } else {
      const recipe = await fetchApiById(typeRecipe, id);
      const newFavorite = generateFavoriteElement(recipe, type);
      newFavorites = [...favoriteRecipes, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    const recipe = await fetchApiById(typeRecipe, id);
    const newFavorite = generateFavoriteElement(recipe, type);
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  }
}

export default setFavoriteLocalStorage;
