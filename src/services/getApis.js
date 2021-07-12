export async function fetchRecipes(searchText, radio) {
  let radioLetter;
  switch (radio) {
  case 'ingredient':
    radioLetter = 'filter.php?i';
    break;
  case 'name':
    radioLetter = 'search.php?s';
    break;
  case 'first-letter':
    radioLetter = 'search.php?f';
    break;
  default:
  }
  const edpoint = `https://www.themealdb.com/api/json/v1/1/${radioLetter}=${searchText}`;
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinksRecipes(searchText, radio) {
  let radioLetter;
  switch (radio) {
  case 'ingredient':
    radioLetter = 'filter.php?i';
    break;
  case 'name':
    radioLetter = 'search.php?s';
    break;
  case 'first-letter':
    radioLetter = 'search.php?f';
    break;
  default:
  }
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/${radioLetter}=${searchText}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchFullRecipes() {
  const edpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchFullDrinksRecipes() {
  const edpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(edpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchMealsCategories() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinksCategories() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchMealsByCategory(category) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinksByCategory(category) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchMealById(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinkById(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchRandomDrink() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchRandomMeal() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchMealIngredients() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchDrinkIngredients() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchAreas() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}

export async function fetchMealsByArea(area) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const result = await fetch(endpoint);
  const resultJson = await result.json();
  return resultJson;
}
