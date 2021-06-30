// Req 26 - Requisição a Api de comida
const RecipesFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export async function fetchApiFoods() {
  const response = await fetch(RecipesFoods);
  const foods = await response.json();
  return (foods.meals);
}
// Req 26 - Requisição a Api de bebidas
const RecipesDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export async function fetchApiDrinks() {
  const response = await fetch(RecipesDrinks);
  const drinks = await response.json();
  return (drinks.drinks);
}
