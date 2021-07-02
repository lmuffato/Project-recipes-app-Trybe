export default async function fetchMeals(filter) {
  const endpoint = filter ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await (await fetch(endpoint)).json();
  return meals;
}
