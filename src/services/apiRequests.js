// const ENDPOINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// const ENDPOINT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// export const requestMeals = async () => {
//   const requestFetch = await fetch(ENDPOINT_MEALS);
//   const requestJSON = await requestFetch.json();
//   return requestJSON;
// };

// export const requestDrinks = async () => {
//   const requestFetch = await fetch(ENDPOINT_DRINKS);
//   const requestJSON = await requestFetch.json();
//   return requestJSON;
// };

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
  callback(ApiData);
};
export const foodsByName = async (name, callback) => {
  const rawApiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const ApiData = await rawApiData.json();
  callback(ApiData);
};
export const foodsByFirstLetter = async (firstLetter, callback) => {
  const rawApiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const ApiData = await rawApiData.json();
  callback(ApiData);
};
export const drinksByIngredient = async (ingredient, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ApiData = await rawApiData.json();
  callback(ApiData);
};
export const drinksByName = async (name, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const ApiData = await rawApiData.json();
  callback(ApiData);
};
export const drinksByFirstLetter = async (firstLetter, callback) => {
  const rawApiData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const ApiData = await rawApiData.json();
  callback(ApiData);
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

export const foodById = async (id) => {
  const rawApiData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  return meals[0];
};

export const drinkById = async (id) => {
  const rawApiData = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  return drinks[0];
};

export const getDrinksRecomends = async () => {
  const rawApiData = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
  );
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  return drinks;
};

export const getFoodsRecomends = async () => {
  const rawApiData = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
  );
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  return meals;
};
