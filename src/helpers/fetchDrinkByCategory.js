const fetchDrinkByCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return response.ok ? Promise.resolve(data) : Promise.reject(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchDrinkByCategory;
