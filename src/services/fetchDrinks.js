export default async function fetchDrinks(filter) {
  const endpoint = filter ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await (await fetch(endpoint)).json();
  return drinks || [];
}
