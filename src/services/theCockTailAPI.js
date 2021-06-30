export const ApiByCocktailName = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByCocktailFirstLetter = async (ingredient) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${ingredient}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByCocktailIngredient = async (ingredient) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiDetailsById = async (id) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiRandom = async () => {
  try {
    const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};
