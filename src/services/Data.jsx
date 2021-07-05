export const fetchFoodsAndCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await response.json();
  return result;
};

export const fetchFoodsAndArea = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result;
};

export const fetchFoodsAndIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  return result;
};

export const fetchMealDetailsByID = async (idMeal) => {
  const response = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const result = await response.json();
  return result;
};

// export const fetchDrinksCategories = async () => {
//   const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
//   const result = await response.json();
//   return result;
// };
