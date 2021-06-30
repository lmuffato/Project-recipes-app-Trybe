export default async function fetchDrinks() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await (await fetch(endpoint)).json();
  return drinks;
}
