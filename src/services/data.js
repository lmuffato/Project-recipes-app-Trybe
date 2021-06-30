export const fetchIngredient = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export const fetchName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export const fetchFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};
