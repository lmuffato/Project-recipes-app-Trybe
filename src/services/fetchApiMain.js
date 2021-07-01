const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_CATEG_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const URL_CATEG_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export function fetchRecipesApi(typeRecipe) {
  return fetch(typeRecipe === 'food' ? URL_FOOD : URL_DRINK)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'food' ? data.meals : data.drinks));
}

export function fetchCategoriesApi(typeRecipe) {
  return fetch(typeRecipe === 'food' ? URL_CATEG_FOOD : URL_CATEG_DRINK)
    .then((response) => response.json())
    .then((data) => (typeRecipe === 'food' ? data.meals : data.drinks));
}
