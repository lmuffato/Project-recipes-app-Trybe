export default async function fetchRecomendations(type) {
  const recom = type === 'themealdb' ? 'thecocktaildb' : 'themealdb';
  const response = await fetch(`https://www.${recom}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  return type === 'themealdb' ? data.drinks : data.meals;
}
