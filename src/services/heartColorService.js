import { setToLocalStorage } from './localStorage';

function heartColorService(obj) {
  const { favoriteRecipe, type, currentMeal,
    currentDrink, setHeartColor } = obj;
  setToLocalStorage('favoriteRecipes', favoriteRecipe);
  if (type === 'comida') {
    const findRecipe = favoriteRecipe.find((recipe) => (
      currentMeal.idMeal === recipe.id));
    if (findRecipe) setHeartColor('black');
    else setHeartColor('white');
  }
  if (type === 'bebida') {
    const findRecipe = favoriteRecipe.find((recipe) => (
      currentDrink.idDrink === recipe.id));
    if (findRecipe) setHeartColor('black');
    else setHeartColor('white');
  }
}

export default heartColorService;
