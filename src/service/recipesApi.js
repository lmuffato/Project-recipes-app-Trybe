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
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function fetchArea() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fetchRecipes(selectArea) {
  const URL = selectArea === 'All'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectArea}`;
  const response = await fetch(URL);
  const data = await response.json();
  const maxMeals = 12;
  const meals = data.meals.slice(0, maxMeals);
  return meals;
}
