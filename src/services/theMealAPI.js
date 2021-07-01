// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list

export const ApiByCategory = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiFirstsResults = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByName = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByFirstLetter = async (letter) => {
  const fetchApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
  );
  const getResponse = await fetchApi.json();
  console.log(getResponse);
  return getResponse;
};

export const ApiByIngredient = async (ingredient) => {
  const fetchApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const getResponse = await fetchApi.json();
  console.log(getResponse);
  return getResponse;
};

export const ApiByAreas = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByIngredients = async () => {
  try {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ingredientImg = async (ingredient) => {
  try {
    const getResponse = await fetch(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
    // const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiRecipeDetail = async (id) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};
