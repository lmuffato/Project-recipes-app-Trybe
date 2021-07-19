const foodsRecomendation = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const fetchdData = await fetch(url);
  const { meals } = await fetchdData.json();
  const number = 6;
  const result = meals.slice(0, number);
  return result;
};

export default foodsRecomendation;
