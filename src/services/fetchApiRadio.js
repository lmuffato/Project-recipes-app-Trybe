const SEARCH_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const SEARCH_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export async function fetchByIngredientApi(ingredient) {
  const data = await fetch(`${SEARCH_BY_INGREDIENT}${ingredient}`);
  const results = await data.json();
  return results;
}

export async function fetchByNameApi(name) {
  const data = await fetch(`${SEARCH_BY_NAME}${name}`);
  const results = await data.json();
  return results;
}

export async function fetchByFirstLetterApi(firstLetter) {
  const data = await fetch(`${SEARCH_BY_FIRST_LETTER}${firstLetter}`);
  const results = await data.json();
  return results;
}
