export async function fetchMealsCategories() {
  const size = 5;
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await (await fetch(endpoint)).json();
  return meals.slice(0, size).map(({ strCategory }) => strCategory);
}

export async function fetchDrinksCategories() {
  const size = 5;
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await (await fetch(endpoint)).json();
  return drinks.slice(0, size).map(({ strCategory }) => strCategory);
}
