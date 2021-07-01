export const MEALS_ALL_CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const ALL_MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const MEALS_BY_CATEGORY_ENDPOINT = (category) => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
