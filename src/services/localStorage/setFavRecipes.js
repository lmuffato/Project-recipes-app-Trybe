import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export function verifyInLS(id) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favorites) return false; // se nao existir a chave favoriteRecipes, obviamente n há receita favorita.
  let iFound = false;
  favorites.forEach((recipe) => {
    if (recipe.id === id) {
      console.log(`Encontrei o id ${id} no LS.`);
      // return true;
      iFound = true;
    }
  });
  return iFound;
  // return false;
}

function addRecipeInFavLS(recipe) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favorites) { // não há nenhuma receita favorita no localStorage.
    const arrFav = [];
    arrFav.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrFav));
  } else { // já tem pelo menos 1 receita favorita no LS
    const arrFavFromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    arrFavFromLS.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrFavFromLS));
  }
}

function removeRecipeFromFavLS(id) { // se está funcao foi chamada, há certeza q o id existe no arrFav do LS.
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  for (let i = 0; i < favorites.length; i += 1) {
    if (favorites[i].id === id) {
      favorites.splice(i, 1);
    }
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

export default function setFavRecipe(recipe) { // esta funcao só sera chamada se clicar no favButton
  if (verifyInLS(recipe.id)) { // se já existir esta recipe no LS, entáo há desejo de remove-la.
    removeRecipeFromFavLS(recipe.id);
    document.getElementById('heart-x').src = whiteHeartIcon;
  } else {
    addRecipeInFavLS(recipe);
    document.getElementById('heart-x').src = blackHeartIcon;
  }
}
