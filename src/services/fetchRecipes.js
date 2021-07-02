const MEALS_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_RECIPES = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const NUMBER_INDEX = 12;
export async function getMeals() {
  const response = await fetch(MEALS_RECIPES);
  const result = await response.json();
  const mealsResult = result.meals;
  const reduceMeals = mealsResult.reduce((acc, curr, index) => (
    index < NUMBER_INDEX ? [...acc, curr] : acc
  ), []);
  return reduceMeals;
}

export async function getDrinks() {
  const response = await fetch(DRINKS_RECIPES);
  const result = await response.json();
  const drinksResult = result.drinks;
  const reduceDrinks = drinksResult.reduce((acc, curr, index) => (
    index < NUMBER_INDEX ? [...acc, curr] : acc
  ), []);
  return reduceDrinks;
}
