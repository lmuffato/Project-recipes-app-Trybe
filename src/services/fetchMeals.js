export default async function fetchMeals(filter) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter || ''}`;
  const { meals } = await (await fetch(endpoint)).json();
  return meals || [];
}
