import fetchJson from '../lib/fetchJson';

const paths = {
  comidas: '/comidas',
  bebidas: '/bebidas',
};

export default async function getRecipes(path) {
  switch (path) {
  case paths.comidas: {
    const results = await fetchJson('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const resultsParsed = results.meals.map((meal) => ({
      ...meal,
      id: meal.idMeal,
      name: meal.strMeal,
      imagePath: meal.strMealThumb,
    }));
    return {
      titlePage: 'Comidas',
      list: resultsParsed,
    };
  }

  case paths.bebidas: {
    const results = await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const resultsParsed = results.drinks.map((drink) => ({
      ...drink,
      id: drink.idDrink,
      name: drink.strDrink,
      imagePath: drink.strDrinkThumb,
    }));
    return {
      titlePage: 'Bebidas',
      list: resultsParsed,
    };
  }

  default:
    break;
  }
}
