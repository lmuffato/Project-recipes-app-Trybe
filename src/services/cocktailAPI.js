const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export async function fetchCocktails() {
  const fetchURL = await fetch(COCKTAIL_API_URL);
  return fetchURL.json();
}

export async function fetchCocktailCategories() {
  const fetchURL = await fetch(COCKTAIL_CATEGORIES_API_URL);
  return fetchURL.json();
}
