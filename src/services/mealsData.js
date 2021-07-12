import fetchJson from '../lib/fetchJson';

function parseMealResults(results) {
  const parsed = results.meals.map((meal) => ({
    ...meal,
    id: meal.idMeal,
    name: meal.strMeal,
    imagePath: meal.strMealThumb,
  }));

  return parsed;
}

export default async function mealsData(filterCategory) {
  const results = await fetchJson('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const resultsParsed = parseMealResults(results);

  const categories = await fetchJson('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  const randomMeal = await fetchJson('https://www.themealdb.com/api/json/v1/1/random.php');

  const parserRandom = parseMealResults(randomMeal);

  if (filterCategory) {
    const filter = await fetchJson(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterCategory}`,
    );

    const filterParsed = parseMealResults(filter);

    return filterParsed;
  }

  return {
    titlePage: 'Comidas',
    categories: categories.meals,
    list: resultsParsed,
    getRandom: parserRandom,
  };
}
