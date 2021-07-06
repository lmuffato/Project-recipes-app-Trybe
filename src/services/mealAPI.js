const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export async function fetchFoods() {
  const fetchURL = await fetch(FOOD_API_URL);
  return fetchURL.json();
}

export async function fetchFoodCategories() {
  const fetchURL = await fetch(FOOD_CATEGORIES_API_URL);
  return fetchURL.json();
}
