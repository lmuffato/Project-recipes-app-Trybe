const fetchFilteredMealRecipes = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const limitedData = {
      ...data,
      [type]: data[type].slice(0, MAX_RECIPES),
    };
    setFilteredRecipes(limitedData);
    // setar no estado de filtro
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchFilteredMealRecipes;
