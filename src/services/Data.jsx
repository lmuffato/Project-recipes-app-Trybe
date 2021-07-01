// FOODS //

export const fetchAllFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result;
};

export const fetchAllCategoriesFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchMealsAndCategory = async (categoryF) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryF}`);
  const result = await response.json();
  return result;
};

// DRINKS //

export const fetchAllDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await response.json();
  return result;
};

export const fetchAllCategoriesDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchDrinksAndCategory = async (categoryD) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryD}`,
  );
  const result = await response.json();
  return result;
};
