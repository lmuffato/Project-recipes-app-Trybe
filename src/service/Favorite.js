export function StorageFood(recipe) {
  const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const current = parseSave.find((element) => element.id === recipe.idMeal);
  if (current) {
    return true;
  }
  return false;
}

export function StorageDrink(recipe) {
  const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const current = parseSave.find((element) => element.id === recipe.idDrink);
  if (current) {
    return true;
  }
  return false;
}

export function FavFood(recipe) {
  const favorite = [{
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  }];
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    window.location.reload();
  } else {
    const favBtn = document.querySelector('.fav-btn');
    const url = 'http://localhost:3000/static/media/whiteHeartIcon.ea3b6ba8.svg';
    const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favBtn.src === url && !StorageFood(recipe)) {
      const combineObj = parseSave.concat(favorite);
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObj));
      window.location.reload();
    } else {
      const current = parseSave.find((element) => element.id === recipe.idMeal);
      const index = parseSave.indexOf(current);
      const minus1 = -1;
      if (index > minus1) {
        parseSave.splice(index, 1);
      }
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(parseSave));
      window.location.reload();
    }
  }
}

export function FavDrink(recipe) {
  const favorite = [{
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  }];
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    window.location.reload();
  } else {
    const favBtn = document.querySelector('.fav-btn');
    const url = 'http://localhost:3000/static/media/whiteHeartIcon.ea3b6ba8.svg';
    const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favBtn.src === url && !StorageDrink(recipe)) {
      const combineObj = parseSave.concat(favorite);
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObj));
      window.location.reload();
    } else {
      const current = parseSave.find((element) => element.id === recipe.idDrink);
      const index = parseSave.indexOf(current);
      const minus1 = -1;
      if (index > minus1) {
        parseSave.splice(index, 1);
      }
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(parseSave));
      window.location.reload();
    }
  }
}
