const fetchFoodDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export default fetchFoodDetails;
