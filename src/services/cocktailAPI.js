const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const COCKTAIL_API_FILTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCKTAIL_API_FIRST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const DRINK_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const DRINK_INGREDIENTS_LIST = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export async function fetchCocktails() {
  const fetchURL = await fetch(COCKTAIL_API_URL);
  return fetchURL.json();
}

export async function fetchCocktailCategories() {
  const fetchURL = await fetch(COCKTAIL_CATEGORIES_API_URL);
  return fetchURL.json();
}

export async function fetchDrinksByName(name) {
  const fetchURL = await fetch(`${COCKTAIL_API_URL}${name}`);
  return fetchURL.json();
}

export async function fetchDrinksByIngredient(ingredient) {
  const fetchURL = await fetch(`${COCKTAIL_API_FILTER_URL}${ingredient}`);
  return fetchURL.json();
}

export async function fetchDrinksByFirstLetter(first) {
  const fetchURL = await fetch(`${COCKTAIL_API_FIRST_URL}${first}`);
  return fetchURL.json();
}

export async function fetchDrinkByCategoryName(categoryName) {
  const fetchURL = await fetch(`${DRINK_BY_CATEGORY}${categoryName}`);
  return fetchURL.json();
}

export async function fetchDrinkByID(drinkId) {
  const fetchURL = await fetch(`${DRINK_BY_ID}${drinkId}`);
  return fetchURL.json();
}

export async function fetchRandomDrink() {
  const fetchURL = await fetch(RANDOM_DRINK);
  return fetchURL.json();
}

export async function fetchDrinkIngredients() {
  const fetchURL = await fetch(DRINK_INGREDIENTS_LIST);
  return fetchURL.json();
}
