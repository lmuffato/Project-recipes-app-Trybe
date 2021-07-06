// FOODS //

export const fetchAllFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result;
};

export const fetchAllCategoriesFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchMealsAndCategory = async (categoryF) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryF}`);
  const result = await response.json();
  return result;
};

export const fetchRandomMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await response.json();
  return result;
};

// DRINKS //

export const fetchAllDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result;
};

export const fetchAllCategoriesDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchDrinksAndCategory = async (categoryD) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryD}`,
  );
  const result = await response.json();
  return result;
};

export const fetchRandomDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const result = await response.json();
  return result;
};

// INGREDIENTS //

export const fetchFoodsIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  return result;
};

export const fetchDrinksIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  return result;
};

// AREA //

export const fetchArea = async () => {
  const response = await fetch('//www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result;
};

// SEARCH BUTTON //

export const fetchSearch = async (radio, input, path) => {
  let searchEndpoint = '';
  let pathEndpoint = 'https://www.themealdb.com/api/json/v1/1';
  if (path === '/bebidas') pathEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1';
  switch (radio) {
  case 'i':
    searchEndpoint = `${pathEndpoint}/filter.php?i=${input}`;
    break;
  case 's':
    searchEndpoint = `${pathEndpoint}/search.php?s=${input}`;
    break;
  case 'f':
    if (input.length > 1) return 'alert';
    searchEndpoint = `${pathEndpoint}/search.php?f=${input}`;
    break;
  default:
    break;
  }
  const response = await fetch(searchEndpoint);
  const result = await response.json();
  return result;
};
