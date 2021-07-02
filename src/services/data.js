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
