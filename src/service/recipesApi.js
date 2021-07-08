const URL_BASE_MEAL = 'https://www.themealdb.com/api/json/v1/1/lookup.php';
const URL_BASE_MEAL_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_BASE_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';
const URL_BASE_DRINK_SEARCH = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

export async function getMeals() {
  const URL = `${URL_BASE_MEAL_SEARCH}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getDrinks() {
  const URL = `${URL_BASE_DRINK_SEARCH}?s=`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getDrink(id) {
  const URL = `${URL_BASE_DRINK}?i=${id}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getFoodsByName(name) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getFoodsByFirstLetter(firstLetter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getFoodsByIngredients(ingredients) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getDrinksByFirstLetter(firstLetter) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getDinksByName(name) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getDrinksByIngredients(ingredients) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getRecipeById(id) {
  const URL = `${URL_BASE_MEAL}?i=${id}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}
