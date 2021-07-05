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

// Req 27 - Requisição a Api de categorias de comida
const CategoryFoods = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export async function fetchCategoryFoods() {
  const response = await fetch(CategoryFoods);
  const categoryFoods = await response.json();
  return categoryFoods.meals;
}

// Req 27 - Requisição a Api de categorias de bebidas
const CategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export async function fetchCategoryDrinks() {
  const response = await fetch(CategoryDrinks);
  const categoryDrinks = await response.json();
  return categoryDrinks.drinks;
}

// Req 28 Requisição a Api de acordo com o filtro
export async function fetchFilterFoods(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const dataCategoryFoods = await response.json();
  return dataCategoryFoods.meals;
}

export async function fetchFilterDrinks(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const dataCategoryDrinks = await response.json();
  return dataCategoryDrinks.drinks;
}

// Req 74 Requisição a Api de random Drinks e Meals

export async function fetchApiRandomDrinks() {
  const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(randomDrink);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchApiRandomMeal() {
  const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(randomMeal);
  const { meals } = await response.json();
  return meals;
}
