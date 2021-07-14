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

export async function drinksData(options) {
  const results = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const resultsParsed = parseDrinkResults(results);

  const categories = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  if (options && options.category) {
    const filter = await fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${options.category}`,
    );

    return parseDrinkResults(filter);
  }

  if (options && options.ingredient) {
    const filter = await fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${options.ingredient}`,
    );

    return parseDrinkResults(filter);
  }

  if (options && options.name) {
    const filter = await fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${options.name}`,
    );

    return parseDrinkResults(filter);
  }

  if (options && options.firstletter) {
    const filter = await fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${options.firstletter}`,
    );

    return parseDrinkResults(filter);
  }

  return {
    titlePage: 'Bebidas',
    categories: categories.drinks,
    list: resultsParsed,
  };
}

export async function exploreDrinksData() {
  const randonDrink = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const parseRandom = parseDrinkResults(randonDrink);

  return { titlePage: 'Explorar Bebidas', random: parseRandom };
}
