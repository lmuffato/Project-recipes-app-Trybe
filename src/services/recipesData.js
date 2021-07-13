import mealsData from './mealsData';
import drinksData from './drinksData';
import fetchJson from '../lib/fetchJson';

const paths = {
  comidas: '/comidas',
  bebidas: '/bebidas',
};

export async function getRecipes(path, options) {
  switch (path) {
  case paths.comidas: {
    const results = await mealsData(options);
    return results;
  }

  case paths.bebidas: {
    const results = await drinksData(options);
    return results;
  }

  default:
    break;
  }
}

export async function getRecipe(path, id) {
  switch (path) {
  case paths.comidas: {
    const results = await fetchJson(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = results.meals[0];
    return {
      ...recipe,
      name: recipe.strMeal,
      imagePath: recipe.strMealThumb,
    };
  }

  case paths.bebidas: {
    const results = await fetchJson(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = results.drinks[0];
    return {
      ...recipe,
      name: recipe.strDrink,
      imagePath: recipe.strDrinkThumb,
    };
  }

  default:
    break;
  }
}
