export default function fetchDrinksById(id) {
  const drinks = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return drinks;
}

export function fetchFoodsById(id) {
  const foods = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return foods;
}

export function fetchRecommendedDrinks() {
  const min = 0;
  const max = 6;
  const recommended = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(min, max));
  return recommended;
}

export function fetchRecommendedFoods() {
  const min = 0;
  const max = 6;
  const recommended = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals.slice(min, max));
  return recommended;
}

export function checkStorageFood(recipe) {
  const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const current = parseSave.find((element) => element.id === recipe.idMeal);
  if (current) {
    return true;
  }
  return false;
}

export function checkStorageDrink(recipe) {
  const parseSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const current = parseSave.find((element) => element.id === recipe.idDrink);
  if (current) {
    return true;
  }
  return false;
}

export function saveFavoriteFood(recipe) {
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
    if (favBtn.src === url && !checkStorageFood(recipe)) {
      const combineObj = parseSave.concat(favorite);
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObj));
      window.location.reload();
    } else {
      const current = parseSave.find((element) => element.id === recipe.idMeal);
      const index = parseSave.indexOf(current);
      const minus1 = -1;
      console.log('rodou o else');
      if (index > minus1) {
        parseSave.splice(index, 1);
      }
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(parseSave));
      window.location.reload();
    }
  }
}

export function saveFavoriteDrink(recipe) {
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
    if (favBtn.src === url && !checkStorageDrink(recipe)) {
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
