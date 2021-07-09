export default async function fetchRecomendations(type) {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
  const data = response.json();
  return type === 'themealdb' ? data.drinks : data.meals;
}
