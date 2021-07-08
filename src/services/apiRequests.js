export const initialFoods = async (callback) => {
  const rawApiData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const initialDrinks = async (callback) => {
  const rawApiData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const foodsByIngredient = async (ingredient, callback) => {
  const rawApiData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const foodsByName = async (name, callback) => {
  const rawApiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const foodsByFirstLetter = async (firstLetter, callback) => {
  const rawApiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const drinksByIngredient = async (ingredient, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const drinksByName = async (name, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const drinksByFirstLetter = async (firstLetter, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const getCategoriesFoods = async (callback) => {
  const rawApiData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const getCategoriesDrinks = async (callback) => {
  const rawApiData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const foodsByCategory = async (callback, category) => {
  const rawApiData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  callback(meals);
};
export const drinksByCategory = async (callback, category) => {
  const rawApiData = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  callback(drinks);
};
export const randomMeal = async (callback) => {
  const rawApiData = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const apiData = await rawApiData.json();
  const { meals } = apiData;
  callback(meals.pop());
};
export const randomDrink = async (callback) => {
  const rawApiData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const apiData = await rawApiData.json();
  const { drinks } = apiData;
  callback(drinks.pop());
};
