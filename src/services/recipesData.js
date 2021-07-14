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

function getIngredients(result) {
  const keys = Object.keys(result);
  const ingredientsName = keys.filter((key) => key.includes('strIngredient'));
  const ingredientsMeasure = keys.filter((key) => key.includes('strMeasure'));

  const ingredientsFromApi = ingredientsName.map((ingredient) => {
    const foundIngredient = result[ingredient];
    return foundIngredient;
  });

  const measuresFromApi = ingredientsMeasure.map((measure) => {
    const foundMeasure = result[measure];
    return foundMeasure;
  });

  let ingredients = {};

  ingredientsFromApi.forEach((ingredient, index) => {
    if (ingredient) {
      ingredients = { ...ingredients, [ingredient]: measuresFromApi[index] };
    }
  });

  return Object.entries(ingredients).reduce(
    (allIngredients, [ingredient, measure]) => {
      if (ingredient && measure) {
        return [
          ...allIngredients,
          `${ingredient} - ${measure}`,
        ];
      }

      return allIngredients;
    }, [],
  );
}

export async function getRecipe(path, id) {
  switch (path) {
  case paths.comidas: {
    const results = await fetchJson(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = results.meals[0];
    const ingredients = getIngredients(recipe);
    return {
      ...recipe,
      name: recipe.strMeal,
      imagePath: recipe.strMealThumb,
      ingredients,
    };
  }

  case paths.bebidas: {
    const results = await fetchJson(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = results.drinks[0];
    const ingredients = getIngredients(recipe);
    return {
      ...recipe,
      name: recipe.strDrink,
      imagePath: recipe.strDrinkThumb,
      ingredients,
    };
  }

  default:
    break;
  }
}

export async function getRecommendations(path) {
  switch (path) {
  case paths.comidas: {
    const results = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const parsed = results.drinks.map((drink) => ({
      ...drink,
      id: drink.idDrink,
      name: drink.strDrink,
      imagePath: drink.strDrinkThumb,
    }));
    return {
      path: paths.bebidas,
      list: parsed,
    };
  }

  case paths.bebidas: {
    const results = await fetchJson('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const parsed = results.meals.map((meal) => ({
      ...meal,
      id: meal.idMeal,
      name: meal.strMeal,
      imagePath: meal.strMealThumb,
    }));
    return {
      path: paths.comidas,
      list: parsed,
    };
  }

  default:
    break;
  }
}
