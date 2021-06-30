export default async function fetchMeals() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await (await fetch(endpoint)).json();
  return meals;
}
