const fetchMealsByIngredient = async (ingredient) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchMealsByIngredient;
