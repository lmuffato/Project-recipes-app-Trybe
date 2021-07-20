const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOOD_API_FILTER_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_API_FIRST_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const RANDOM_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
const FOOD_BY_AREA_GENERAL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FOOD_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const FOOD_INGREDIENTS_LIST = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export async function fetchFoods() {
  const fetchURL = await fetch(FOOD_API_URL);
  return fetchURL.json();
}

export async function fetchFoodCategories() {
  const fetchURL = await fetch(FOOD_CATEGORIES_API_URL);
  return fetchURL.json();
}

export async function fetchFoodsByName(name) {
  const fetchURL = await fetch(`${FOOD_API_URL}${name}`);
  return fetchURL.json();
}

export async function fetchFoodsByIngredient(ingredient) {
  const fetchURL = await fetch(`${FOOD_API_FILTER_URL}${ingredient}`);
  return fetchURL.json();
}

export async function fetchFoodsByFirstLetter(first) {
  const fetchURL = await fetch(`${FOOD_API_FIRST_URL}${first}`);
  return fetchURL.json();
}

export async function fetchFoodByCategoryName(categoryName) {
  const fetchURL = await fetch(`${FOODS_BY_CATEGORY}${categoryName}`);
  return fetchURL.json();
}

export async function fetchFoodByID(foodId) {
  const fetchURL = await fetch(`${FOOD_BY_ID}${foodId}`);
  return fetchURL.json();
}

export async function fetchRandomFood() {
  const fetchURL = await fetch(RANDOM_FOOD);
  return fetchURL.json();
}

export async function fetchFoodAreaGeneral() {
  const fetchURL = await fetch(FOOD_BY_AREA_GENERAL);
  return fetchURL.json();
}

export async function fetchFoodArea(area) {
  const fetchURL = await fetch(`${FOOD_BY_AREA}${area}`);
  return fetchURL.json();
}

export async function fetchFoodIngredients() {
  const fetchURL = await fetch(FOOD_INGREDIENTS_LIST);
  return fetchURL.json();
}
