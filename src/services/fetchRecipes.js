const MEALS_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_RECIPES = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const NUMBER_INDEX = 12;

export async function getMeals() {
  const response = await fetch(MEALS_RECIPES);
  const result = await response.json();
  const mealsResult = result.meals;
  const reduceMeals = mealsResult.reduce((acc, curr, index) => (
    index < NUMBER_INDEX ? [...acc, curr] : acc
  ), []);
  return reduceMeals;
}

export async function getDrinks() {
  const response = await fetch(DRINKS_RECIPES);
  const result = await response.json();
  const drinksResult = result.drinks;
  const reduceDrinks = drinksResult.reduce((acc, curr, index) => (
    index < NUMBER_INDEX ? [...acc, curr] : acc
  ), []);
  return reduceDrinks;
}

export async function getCaterories(page) {
  const endpoint = (page === 'meals')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const result = response.json();
  return result;
}

export async function getByCategoryName(page, recipe) {
  const endpoint = (page === 'meals')
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${recipe}`;
  const response = await fetch(endpoint);
  const result = response.json();
  return result;
}

export async function getRecipeByID(pathname, id) {
  const endpoint = (pathname.includes('comidas'))
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const result = response.json();
  return result;
}
