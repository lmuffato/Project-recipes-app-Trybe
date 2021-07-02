export default async function fetchDrinks(filter) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter || ''}`;
  const { drinks } = await (await fetch(endpoint)).json();
  return drinks || [];
}
