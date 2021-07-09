const FILTER_FOODS_API = 'https://www.themealdb.com/api/json/v1/1/filter.php';
const FILTER_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

export async function fetchRecipes(key, domain, qtd) {
  const response = await fetch(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  const results = data[key].slice(0, qtd);
  return results;
}

export async function fetchCategories(key, domain, qtd) {
  const response = await fetch(`https://www.${domain}.com/api/json/v1/1/list.php?c=list`);
  const data = await response.json();
  const results = data[key].slice(0, qtd);
  return results;
}

export async function fetchRecipesByCategory(key, category, domain, qtd) {
  const response = await fetch(
    `https://www.${domain}.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const data = await response.json();
  const results = data[key].slice(0, qtd);
  return results;
}

export const filterIngredient = async (query, currentPage) => {
  const INGREDIENT_API = currentPage === 'Drinks'
    ? FILTER_DRINKS_API
    : FILTER_FOODS_API;
  const api = await fetch(`${INGREDIENT_API}?i=${query}`);
  const result = await api.json();
  console.log(result);
  return result;
};

export const filterName = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?s=${query}`);
  const result = await api.json();
  return result;
};

export const filterFirstLetter = async (query, currentPage) => {
  const SEARCH_BASE_API = currentPage === 'Foods'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

  const api = await fetch(`${SEARCH_BASE_API}?f=${query}`);
  const result = await api.json();
  return result;
};

export const filterCategory = async (query, currentPage) => {
  const CATEGORY_API = currentPage === 'Foods'
    ? FILTER_FOODS_API
    : FILTER_DRINKS_API;
  const api = await fetch(`${CATEGORY_API}?c=${query}`);
  const result = await api.json();
  console.log(result);
  return result;
};
