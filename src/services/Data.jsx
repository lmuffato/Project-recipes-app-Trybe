export const fetchFoodsAndCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchFoodsAndArea = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result;
};

export const fetchFoodsAndIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  return result;
};

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
