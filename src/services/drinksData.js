import fetchJson from '../lib/fetchJson';

function parseDrinkResults(results) {
  const parsed = results.drinks.map((drink) => ({
    ...drink,
    id: drink.idDrink,
    name: drink.strDrink,
    imagePath: drink.strDrinkThumb,
  }));

  return parsed;
}

export default async function drinksData(filterCategory) {
  const results = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const resultsParsed = parseDrinkResults(results);

  const categories = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  const randonDrink = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/random.php');

  const parseRandom = parseDrinkResults(randonDrink);

  if (filterCategory) {
    const filter = await fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterCategory}`,
    );

    const filterParsed = parseDrinkResults(filter);

    return filterParsed;
  }

  return {
    titlePage: 'Bebidas',
    categories: categories.drinks,
    list: resultsParsed,
    getRandom: parseRandom,
  };
}
