export const DRINKS_ALL_CATEGORIES_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const ALL_DRINKS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const DRINKS_BY_CATEGORY_ENDPOINT = (category) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
export const DRINKS_BY_INGREDIENT_ENDPOINT = (ingredient) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
export const DRINKS_BY_NAME_ENDPOINT = (name) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
export const DRINKS_BY_FIRST_LETTER_ENDPOINT = (firstLetter) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
export const DRINKS_BY_ID_ENDPOINT = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
export const DRINKS_INGREDIENT_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
