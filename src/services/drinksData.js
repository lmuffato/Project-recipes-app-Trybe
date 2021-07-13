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

function parseIngredientResults(ingredients) {
  const parsed = ingredients.map((ingredient) => ({
    ...ingredient,
    id: ingredient.strIngredient1,
    name: ingredient.strIngredient1,
    imagePath: `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`,
  }));

  return parsed;
}

export async function drinksData(filterCategory) {
  const results = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const resultsParsed = parseDrinkResults(results);

  const categories = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

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
  };
}

export async function exploreDrinksData() {
  const randonDrink = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/random.php');

  const ingredients = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

  const parseRandom = parseDrinkResults(randonDrink);

  const parseIngredients = parseIngredientResults(ingredients.drinks);

  return {
    titlePage: 'Explorar Bebidas',
    random: parseRandom,
    ingredients: parseIngredients,
  };
}
