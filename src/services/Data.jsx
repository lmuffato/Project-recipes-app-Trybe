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

export const fetchSearch = async (radio, input) => {
  let searchEndpoint = '';
  switch (radio) {
  case 'i':
    searchEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    break;
  case 's':
    searchEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    break;
  case 'f':
    if (input.length > 1) return 'alert';
    searchEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    break;
  default:
    break;
  }
  const response = await fetch(searchEndpoint);
  const result = await response.json();
  return result;
};
