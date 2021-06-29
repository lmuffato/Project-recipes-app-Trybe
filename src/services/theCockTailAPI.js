export const ApiByName = async (name) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const getResponse = await fetchApi.json();
    return getResponse;
  } catch (error) {
    return error;
  }
};

export const ApiByIngredient = async (ingredient) => {
  try {
    const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`);
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
