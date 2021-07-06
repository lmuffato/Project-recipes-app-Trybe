export const MEALS_ALL_CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const ALL_MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const MEALS_BY_CATEGORY_ENDPOINT = (category) => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
export const MEALS_BY_INGREDIENT_ENDPOINT = (ingredient) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
export const MEALS_BY_NAME_ENDPOINT = (name) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
export const MEALS_BY_FIRST_LETTER_ENDPOINT = (firstLetter) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
export const MEALS_BY_ID_ENDPOINT = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
