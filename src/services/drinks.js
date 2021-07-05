export const DRINKS_ALL_CATEGORIES_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const ALL_DRINKS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const DRINKS_BY_CATEGORY_ENDPOINT = (category) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
