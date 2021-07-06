const genericFetch = async (URL) => {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export const fetchIngredient = async (site, ingredient) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const result = await genericFetch(URL);
  return result;
};

export const fetchName = async (site, name = '') => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/search.php?s=${name}`;
  const result = await genericFetch(URL);
  return result;
};

export const fetchFirstLetter = async (site, firstLetter) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const result = await genericFetch(URL);
  return result;
};

export const fetchList = async (site) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/list.php?c=list`;
  const result = await genericFetch(URL);
  return result;
};

export const fetchByCategory = async (site, category) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/filter.php?c=${category}`;
  const result = await genericFetch(URL);
  return result;
};

export const fetchById = async (site, id) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await genericFetch(URL);
  return result;
};
