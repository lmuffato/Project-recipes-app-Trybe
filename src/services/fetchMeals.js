export default async function fetchMeals(filter) {
  const endpoint = filter ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await (await fetch(endpoint)).json();
  return meals;
}

export async function fetchMealSearched(text, option) {
  if (option === 'ingredient') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
    const { meals } = await (await fetch(endpoint)).json();
    return meals || [];
  }

  if (option === 'name') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    const { meals } = await (await fetch(endpoint)).json();
    return meals || [];
  }

  if (option === 'first-letter') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
    const { meals } = await (await fetch(endpoint)).json();
    return meals || [];
  }
}

export async function fetchSpecificMeal(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await (await fetch(endpoint)).json();
  return meals;
}
