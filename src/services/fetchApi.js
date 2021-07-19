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

export async function fetchRecipeFood(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const dataResponse = await response.json();
  // console.log(dataResponse.meals[0]);
  // console.log('request api');
  return dataResponse.meals[0];
}

// exportar funcao q faz fetch em drinks
export async function fetchRecipeDrink(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const dataResponse = await response.json();
  // console.log(dataResponse);
  return dataResponse.drinks[0];
}

export async function fetchFoodsRecommended() {
  const SIX = 6;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataResponseR = await response.json();
  const arrLength6 = [];
  // shuffle(dataResponseR.meals);
  for (let i = 0; i < SIX; i += 1) {
    arrLength6.push(dataResponseR.meals[i]);
  }
  return arrLength6;
}

export async function fetchDrinksRecommended() {
  const SIX = 6;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataResponseRD = await response.json();
  const arrLength6 = [];
  for (let i = 0; i < SIX; i += 1) {
    arrLength6.push(dataResponseRD.drinks[i]);
  }
  return arrLength6;
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

// Requisito 75 Requisição API de Ingredientes FOODS e DRINKS
export async function fetchApiIngredientsFood() {
  const foodIngredientsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(foodIngredientsUrl);
  const { meals } = await response.json();
  return meals;
}

export async function fetchApiIngredientsDrink() {
  const drinkIngredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(drinkIngredientsUrl);
  const { drinks } = await response.json();
  return drinks;
}
// Req 14 Requisição a Api de acordo com o filtro
export async function fetchFilterFoodByIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const dataIngredientFoods = await response.json();
  return dataIngredientFoods.meals;
}

export async function fetchFilterDrinkByIngredient(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const dataIngredientDrinks = await response.json();
  return dataIngredientDrinks.drinks;
}

export async function fetchFilterFoodByName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const dataNameFoods = await response.json();
  return dataNameFoods.meals;
}

export async function fetchFilterDrinkByName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const dataNameDrinks = await response.json();
  return dataNameDrinks.drinks;
}

export async function fetchFilterFoodByLetter(firstLetter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const dataFirstLetterFoods = await response.json();
  return dataFirstLetterFoods.meals;
}

export async function fetchFilterDrinkByLetter(firstLetter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const dataFirstLetterDrinks = await response.json();
  return dataFirstLetterDrinks.drinks;
}

export async function fetchMealsCountries() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
}

export async function fetchSearchMealByCountry(country) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
  const { meals } = await response.json();
  return meals;
}
